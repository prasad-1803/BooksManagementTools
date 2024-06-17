import React, { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import {
    CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow,
    CTableHeaderCell, CTableBody, CTableDataCell, CButton, CModal,
    CModalBody, CModalHeader, CModalTitle, CModalFooter
} from '@coreui/react'; 
import '@coreui/coreui/dist/css/coreui.min.css'; 

const Books = () => {
    const [books, setBooks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                console.log(res.data); 
                setBooks(res.data); 
            } catch (err) {
                console.log(err); 
            }
        };

        fetchAllBooks(); 
    }, []); 

    const handleBookClick = (book) => {
        console.log('Book clicked:', book); 
        setSelectedBook(book); 
        setModalOpen(true); 
    };

    const handleCloseModal = () => {
        console.log('Closing modal'); 
        setModalOpen(false); 
        setSelectedBook(null); 
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the row
        try {
            await axios.delete(`http://localhost:8800/books/${id}`);
            setBooks(books.filter(book => book.id !== id)); // Update the state without reloading the page
        } catch (err) {
            console.log(err); 
        }
    };

    return (
        <div className='home'>
            <h1>Books Management Tool</h1>

            <CCard>
                <CCardHeader style={{ display:"flex",justifyContent:"space-between"}}>
                    Book List 
                    <CButton color="primary">
                        <Link to="/add" style={{ color: 'white', textDecoration: 'none' }}>Add new book</Link>
                    </CButton> 
                </CCardHeader>
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
                                <CTableHeaderCell>Actions</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {books.map((book) => (
                                <CTableRow key={book.id} onClick={() => handleBookClick(book)}>
                                    <CTableDataCell>{book.title}</CTableDataCell>
                                    <CTableDataCell>{book.author}</CTableDataCell>
                                    <CTableDataCell>{book.type_id}</CTableDataCell>
                                    <CTableDataCell>{book.genre_id}</CTableDataCell>
                                    <CTableDataCell>{book.publication}</CTableDataCell>
                                    <CTableDataCell>{book.pages}</CTableDataCell>
                                    <CTableDataCell>{book.price}</CTableDataCell>
                                    <CTableDataCell style={{ display:"flex", gap:"20px" }}>
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
                </CCardBody>
            </CCard>

            <CModal visible={modalOpen} onClose={handleCloseModal}>
                <CModalHeader>
                    <CModalTitle>Book Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedBook && (
                        <div>
                            <p><strong>Title:</strong> {selectedBook.title}</p>
                            <p><strong>Author:</strong> {selectedBook.author}</p>
                            <p><strong>Type:</strong> {selectedBook.type_id}</p>
                            <p><strong>Genre:</strong> {selectedBook.genre_id}</p>
                            <p><strong>Publication:</strong> {selectedBook.publication}</p>
                            <p><strong>No of Pages:</strong> {selectedBook.pages}</p>
                            <p><strong>Price:</strong> {selectedBook.price}</p>
                            {selectedBook.cover_photo ? (
                                <img src={`http://localhost:8800/uploads/${selectedBook.cover_photo}`} alt={selectedBook.title} style={{ width: '100px', height: '100px' }} />
                            ) : (
                                <p>No Cover Photo</p>
                            )}
                        </div>
                    )}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={handleCloseModal}>Close</CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default Books;
