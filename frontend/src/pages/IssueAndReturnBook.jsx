import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IssueReturnBook = () => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  useEffect(() => {
    fetchBooks();
    fetchStudents();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8800/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:8800/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleIssue = async () => {
    try {
      await axios.post('http://localhost:8800/issue', {
        bookId: selectedBook,
        studentId: selectedStudent,
        issueDate
      });
      alert('Book issued successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const handleReturn = async () => {
    try {
      await axios.post('http://localhost:8800/return', {
        bookId: selectedBook,
        studentId: selectedStudent,
        returnDate
      });
      alert('Book returned successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Issue/Return Books</h1>
      <div>
        <h2>Issue Book</h2>
        <select onChange={(e) => setSelectedBook(e.target.value)} value={selectedBook}>
          <option value="">Select Book</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>{book.title}</option>
          ))}
        </select>
        <select onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent}>
          <option value="">Select Student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </select>
        <input type="date" onChange={(e) => setIssueDate(e.target.value)} value={issueDate} />
        <button onClick={handleIssue}>Issue Book</button>
      </div>
      <div>
        <h2>Return Book</h2>
        <select onChange={(e) => setSelectedBook(e.target.value)} value={selectedBook}>
          <option value="">Select Book</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>{book.title}</option>
          ))}
        </select>
        <select onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent}>
          <option value="">Select Student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </select>
        <input type="date" onChange={(e) => setReturnDate(e.target.value)} value={returnDate} />
        <button onClick={handleReturn}>Return Book</button>
      </div>
    </div>
  );
};

export default IssueReturnBook;
