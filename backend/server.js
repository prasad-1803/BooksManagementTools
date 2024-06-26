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

// Function to update book status
const updateBookStatus = (bookId, isActive) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE books SET active = ? WHERE id = ?";
        db.query(query, [isActive, bookId], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Express.js route example
app.put('/books/:id/status', (req, res) => {
    const bookId = req.params.id;
    const isActive = req.body.active;

    
    // Assuming you're using a function updateBookStatus(bookId, isActive)
    updateBookStatus(bookId, isActive)
        .then(() => res.status(200).send({ message: 'Status updated successfully' }))
        .catch(err => res.status(500).send({ message: 'Error updating status', error: err }));
});

// Endpoint to get all active books
app.get("/books", (req, res) => {
    const query = `
        SELECT b.*, t.name AS type_name, g.name AS genre_name 
        FROM books b 
        LEFT JOIN typesofbook t ON b.type_id = t.id 
        LEFT JOIN genreofbook g ON b.genre_id = g.id
        
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

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;

    if (!bookId) {
        return res.status(400).json({ error: "Book ID is required" });
    }

    const query = "DELETE FROM books WHERE id = ?";

    db.query(query, [bookId], (err, result) => {
        if (err) {
            console.error("Error deleting book:", err);
            return res.status(500).json({ error: "Error deleting book", details: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json({ message: "Book has been deleted successfully" });
    });
});


// Endpoint to list all students
app.get("/students", (req, res) => {
    const query = "SELECT * FROM students";
    db.query(query, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error fetching students', err });
        return res.status(200).json(data);
    });
});
app.get("/students/:id", (req, res) => {
    const studentId = req.params.id;
    const query = "SELECT * FROM students WHERE id = ?";
    
    db.query(query, [studentId], (err, data) => {
        if (err) return res.status(500).json({ error: 'Error fetching student', err });
        if (data.length === 0) return res.status(404).json({ error: 'Student not found' });
        return res.status(200).json(data[0]);
    });
});


// Endpoint to add a new student
app.post("/addstudent", (req, res) => {
    const { name, age, grade, email } = req.body;
    const query = "INSERT INTO students (name, age, grade, email) VALUES (?, ?, ?, ?)";
    const values = [name, age, grade, email];
    
    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error adding student', err });
        return res.status(201).json({ message: 'Student added successfully', studentId: result.insertId });
    });
});

// Endpoint to update a student by ID
app.put("/students/:id", (req, res) => {
    const studentId = req.params.id;
    const { name, age, grade, email } = req.body;
    const query = "UPDATE students SET name = ?, age = ?, grade = ?, email = ? WHERE id = ?";
    const values = [name, age, grade, email, studentId];
    
    db.query(query, values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error updating student', err });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        return res.status(200).json({ message: 'Student updated successfully' });
    });
});

// Endpoint to issue a book to a student
app.post('/issue', (req, res) => {
    const { bookId, studentId, issueDate } = req.body;
  
    if (!bookId || !studentId || !issueDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const query = 'INSERT INTO issued_books (book_id, student_id, issue_date) VALUES (?, ?, ?)';
    const values = [bookId, studentId, issueDate];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error issuing book:', err);
        return res.status(500).json({ error: 'Error issuing book' });
      }
      res.status(201).json({ message: 'Book issued successfully' });
    });
  });
  

// Endpoint to return a book from a student
app.post('/return', (req, res) => {
    const { bookId, studentId, returnDate } = req.body;
  
    if (!bookId || !studentId || !returnDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const query = 'UPDATE issued_books SET return_date = ? WHERE book_id = ? AND student_id = ?';
    const values = [returnDate, bookId, studentId];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error returning book:', err);
        return res.status(500).json({ error: 'Error returning book' });
      }
      res.status(200).json({ message: 'Book returned successfully' });
    });
  });
  
// Endpoint to get a report of books issued to a specific student
app.get('/issued-books', (req, res) => {
    const query = `
      SELECT ib.*, b.title as book_title, s.name as student_name 
      FROM issued_books ib
      JOIN books b ON ib.book_id = b.id
      JOIN students s ON ib.student_id = s.id
    `;
  
    db.query(query, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error fetching issued books report' });
      }
      res.json(data);
    });
  });


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
