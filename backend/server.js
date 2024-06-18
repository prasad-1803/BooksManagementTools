import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Ensure 'uploads' directory exists
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Endpoint to add a new book
app.post('/addbooks', upload.single('cover'), (req, res) => {
    const { title, author, type_id, genre_id, publication, pages, price } = req.body;
    const cover = req.file ? req.file.filename : null;

    const query = 'INSERT INTO books (title, author, type_id, genre_id, publication, pages, price, cover_photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [title, author, type_id, genre_id, publication, pages, price, cover];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error inserting book data' });
        }
        res.status(201).json({ message: 'Book added successfully', bookId: result.insertId });
    });
});

// Endpoint to get all active books
app.get("/books", (req, res) => {
    const query = `
        SELECT b.*, t.name AS type_name, g.name AS genre_name 
        FROM books b 
        LEFT JOIN typesofbook t ON b.type_id = t.id 
        LEFT JOIN genreofbook g ON b.genre_id = g.id
        WHERE b.active = TRUE
    `;
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Endpoint to get a specific book by ID
app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "SELECT * FROM books WHERE id = ?";
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});

// Endpoint to update a specific book by ID
app.put("/books/:id", upload.single('cover'), (req, res) => {
    const bookId = req.params.id;
    const { title, author, type_id, genre_id, publication, pages, price } = req.body;
    let cover = req.body.cover_photo;

    if (req.file) {
        cover = req.file.filename;
    }

    const q = "UPDATE books SET title = ?, author = ?, type_id = ?, genre_id = ?, publication = ?, pages = ?, price = ?, cover_photo = ? WHERE id = ?";
    const values = [title, author, type_id, genre_id, publication, pages, price, cover, bookId];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated successfully");
    });
});

// Endpoint to deactivate a specific book by ID
app.put("/books/deactivate/:id", (req, res) => {
    const bookId = req.params.id;
    const query = "UPDATE books SET active = FALSE WHERE id = ?";
    
    db.query(query, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deactivated successfully");
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
