// Table.jsx
import React from 'react';
import {
    CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton
} from '@coreui/react';
import { Link } from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css';

const Table = ({ data, handleBookClick, handleStatusChange, handleDelete }) => {
    return (
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
                    <CTableHeaderCell>Active</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {data.map((book) => (
                    <CTableRow key={book.id} onClick={(e) => handleBookClick(book, e)}>
                        <CTableDataCell>{book.title}</CTableDataCell>
                        <CTableDataCell>{book.author}</CTableDataCell>
                        <CTableDataCell>{book.type_name}</CTableDataCell>
                        <CTableDataCell>{book.genre_name}</CTableDataCell>
                        <CTableDataCell>{book.publication}</CTableDataCell>
                        <CTableDataCell>{book.pages}</CTableDataCell>
                        <CTableDataCell>{book.price}</CTableDataCell>
                        <CTableDataCell>
                            <input
                                type="checkbox"
                                checked={book.active}
                                style={{ width: '20px', height: '20px' }}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(book.id, e.target.checked, e);
                                }}
                            />
                        </CTableDataCell>
                        <CTableDataCell style={{ display: "flex", gap: "20px" }}>
                            <CButton color="primary">
                                <Link to={`/Update/${book.id}`} style={{ color: 'white', textDecoration: 'none' }}>Update</Link>
                            </CButton>
                            <CButton color="danger" onClick={(e) => handleDelete(book.id, e)}>
                                Delete
                            </CButton>
                        </CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    );
};

export default Table;
