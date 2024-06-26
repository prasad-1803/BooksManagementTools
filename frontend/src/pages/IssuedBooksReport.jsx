import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';

const IssuedBooksReport = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8800/issued-books');
      setIssuedBooks(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CContainer>
      <CRow className="mb-4">
        <CCol>
          <CCard>
            <CCardHeader>
              <h1>Issued Books Report</h1>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Book Title</CTableHeaderCell>
                    <CTableHeaderCell>Student Name</CTableHeaderCell>
                    <CTableHeaderCell>Issue Date</CTableHeaderCell>
                    <CTableHeaderCell>Return Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {issuedBooks.map(record => (
                    <CTableRow key={record.id}>
                      <CTableDataCell>{record.book_title}</CTableDataCell>
                      <CTableDataCell>{record.student_name}</CTableDataCell>
                      <CTableDataCell>{new Date(record.issue_date).toLocaleDateString()}</CTableDataCell>
                      <CTableDataCell>{record.return_date ? new Date(record.return_date).toLocaleDateString() : 'Not yet returned'}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default IssuedBooksReport;
