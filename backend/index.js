import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";

const app = express();
const PORT = 8800;

app.use(express.json());
app.use(cors());

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pass@123",
    database: "library"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

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

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted successfully");
    });
});

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const { title, author, type_id, genre_id, publication, pages, price, cover_photo } = req.body;
    const q = "UPDATE books SET title = ?, author = ?, type_id = ?, genre_id = ?, publication = ?, pages = ?, price = ?, cover_photo = ? WHERE id = ?";
    const values = [title, author, type_id, genre_id, publication, pages, price, cover_photo, bookId];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated successfully");
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
