import React from 'react';
import {
  CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton
} from '@coreui/react';
import { Link } from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css';

const Table = ({ data, handleBookClick, handleStatusChange, handleDelete }) => {
  const isBookData = data.length > 0 && data[0].title; // Assuming if data has title, it's books data

  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          {isBookData ? (
            <>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableHeaderCell>Author</CTableHeaderCell>
              <CTableHeaderCell>Type</CTableHeaderCell>
              <CTableHeaderCell>Genre</CTableHeaderCell>
              <CTableHeaderCell>Publication</CTableHeaderCell>
              <CTableHeaderCell>No of Pages</CTableHeaderCell>
              <CTableHeaderCell>Price</CTableHeaderCell>
              <CTableHeaderCell>Active</CTableHeaderCell>
            </>
          ) : (
            <>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Grade</CTableHeaderCell>
              <CTableHeaderCell>Age</CTableHeaderCell>
             

            </>
          )}
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((item) => (
          <CTableRow key={item.id} onClick={(e) => handleBookClick(item, e)}>
            {isBookData ? (
              <>
                <CTableDataCell>{item.title}</CTableDataCell>
                <CTableDataCell>{item.author}</CTableDataCell>
                <CTableDataCell>{item.type_name}</CTableDataCell>
                <CTableDataCell>{item.genre_name}</CTableDataCell>
                <CTableDataCell>{item.publication}</CTableDataCell>
                <CTableDataCell>{item.pages}</CTableDataCell>
                <CTableDataCell>{item.price}</CTableDataCell>
                <CTableDataCell>
                  <input
                    type="checkbox"
                    checked={item.active}
                    style={{ width: '20px', height: '20px' }}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleStatusChange(item.id, e.target.checked, e);
                    }}
                  />
                </CTableDataCell>
              </>
            ) : (
              <>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.email}</CTableDataCell>
                <CTableDataCell>{item.grade}</CTableDataCell>
                <CTableDataCell>{item.age}</CTableDataCell>
              </>
            )}
            <CTableDataCell style={{ display: "flex", gap: "20px" }}>
              <CButton color="primary">
                <Link to={`/${isBookData ? 'update' : 'students/update'}/${item.id}`} style={{ color: 'white', textDecoration: 'none' }}>Update</Link>
              </CButton>
              <CButton color="danger" onClick={(e) => handleDelete(item.id, e)}>
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
