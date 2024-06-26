import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormSelect,
  CFormInput,
  CButton,
  CContainer,
  CRow,
  CCol,
  CAlert
} from '@coreui/react';

const IssueReturnBook = () => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [alert, setAlert] = useState({ visible: false, message: '', color: '' });

  useEffect(() => {
    fetchBooks();
    fetchStudents();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8800/books');
      // Filter out inactive books
      const activeBooks = res.data.filter(book => book.active === 1);
      setBooks(activeBooks);
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
      setAlert({ visible: true, message: 'Book issued successfully', color: 'success' });
    } catch (err) {
      console.error(err);
      setAlert({ visible: true, message: 'Error issuing book', color: 'danger' });
    }
  };

  const handleReturn = async () => {
    try {
      await axios.post('http://localhost:8800/return', {
        bookId: selectedBook,
        studentId: selectedStudent,
        returnDate
      });
      setAlert({ visible: true, message: 'Book returned successfully', color: 'success' });
    } catch (err) {
      console.error(err);
      setAlert({ visible: true, message: 'Error returning book', color: 'danger' });
    }
  };

  return (
    <CContainer>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h1>Issue/Return Books</h1>
            </CCardHeader>
            <CCardBody>
              {alert.visible && (
                <CAlert color={alert.color} onClose={() => setAlert({ visible: false })} dismissible>
                  {alert.message}
                </CAlert>
              )}
              <CForm>
                <h2>Issue Book</h2>
                <CFormSelect onChange={(e) => setSelectedBook(e.target.value)} value={selectedBook}>
                  <option value="">Select Book</option>
                  {books.map(book => (
                    <option key={book.id} value={book.id}>{book.title}</option>
                  ))}
                </CFormSelect>
                <CFormSelect onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent}>
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </CFormSelect>
                <CFormInput type="date" onChange={(e) => setIssueDate(e.target.value)} value={issueDate} />
                <CButton color="primary" onClick={handleIssue}>Issue Book</CButton>
              </CForm>
              <CForm className="mt-4">
                <h2>Return Book</h2>
                <CFormSelect onChange={(e) => setSelectedBook(e.target.value)} value={selectedBook}>
                  <option value="">Select Book</option>
                  {books.map(book => (
                    <option key={book.id} value={book.id}>{book.title}</option>
                  ))}
                </CFormSelect>
                <CFormSelect onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent}>
                  <option value="">Select Student</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </CFormSelect>
                <CFormInput type="date" onChange={(e) => setReturnDate(e.target.value)} value={returnDate} />
                <CButton color="primary" onClick={handleReturn}>Return Book</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default IssueReturnBook;
