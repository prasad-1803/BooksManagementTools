import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";

const app=express();
const PORT=8800;


app.use(express.json());
app.use(cors());
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Pass@123",
    database:"library"
});

// Database connection

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Multer setup for handling file uploads
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

app.get("/books",(req,res)=>{
    const q="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
    });

  


app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});