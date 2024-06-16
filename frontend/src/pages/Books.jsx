import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,CButton } from '@coreui/react';
const Books = () => {
    const [books,setBooks]=useState([])
    useEffect(()=>{
    const fechAllBooks=async ()=>{
        try{
           const res=await axios.get("http://localhost:8800/books");
         setBooks(res.data);
        }catch(err){
            console.log(err)
        }

    }
    fechAllBooks();

    },[])
  return (
    <div className='home'>
        <h1>Books Management Tool</h1>

        <CCard>
                <CCardHeader>Books List</CCardHeader>
                <CCardBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell>Title</CTableHeaderCell>
                                <CTableHeaderCell>Author</CTableHeaderCell>
                                <CTableHeaderCell>Type</CTableHeaderCell>
                                <CTableHeaderCell>Genre</CTableHeaderCell>
                                <CTableHeaderCell>Publication</CTableHeaderCell>
                                <CTableHeaderCell>No of Pages</CTableHeaderCell>
                                <CTableHeaderCell>Price</CTableHeaderCell>
                                <CTableHeaderCell>Cover</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {books.map((book) => (
                                <CTableRow key={book.BookID}>
                                    <CTableDataCell>{book.Title}</CTableDataCell>
                                    <CTableDataCell>{book.Author}</CTableDataCell>
                                    <CTableDataCell>{book.BookTypeID}</CTableDataCell>
                                    <CTableDataCell>{book.GenreID}</CTableDataCell>
                                    <CTableDataCell>{book.Publication}</CTableDataCell>
                                    <CTableDataCell>{book.NoOfPages}</CTableDataCell>
                                    <CTableDataCell>{book.Price}</CTableDataCell>
                                    <CTableDataCell>
                                        {book.Cover ? <img src={book.Cover} alt={book.Title} style={{width: '50px', height: '50px'}} /> : 'N/A'}
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>

            <CButton color="primary">
                <Link to="/add" style={{ color: 'white', textDecoration: 'none' }}>Add new book</Link>
            </CButton>
        
    </div>

  )
}

export default Books