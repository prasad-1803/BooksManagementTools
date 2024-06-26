
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    CCard, CCardBody, CCardHeader, CModal,
    CModalBody, CModalHeader, CModalTitle, CModalFooter, CButton
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import Table from '../../components/Table'; // Import the new Table component

const Books = () => {
    const [books, setBooks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllBooks();
    }, []);

    const handleBookClick = (book, e) => {
        if (e.target.type !== 'checkbox') {
            setSelectedBook(book);
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedBook(null);
    };

    // const handleDelete = async (id, e) => {
    //     e.stopPropagation(); // Prevent the click event from bubbling up to the row
    //     try {
    //         await axios.delete(`http://localhost:8800/books/${id}`);
    //         setBooks(books.filter(book => book.id !== id)); // Update the state without reloading the page
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const handleStatusChange = async (id, isActive, e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the row
        try {
            await axios.put(`http://localhost:8800/books/${id}/status`, { active: isActive });
            setBooks(books.map(book => book.id === id ? { ...book, active: isActive } : book));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='home'>
            <h1>Books Management Tool</h1>

            <CCard>
                <CCardHeader style={{ display: "flex", justifyContent: "space-between" }}>
                    Book List
                    <CButton color="primary">
                        <Link to="/add" style={{ color: 'white', textDecoration: 'none' }}>Add new book</Link>
                    </CButton>
                </CCardHeader>
                <CCardBody>
          {/* added table component */}
                    <Table
                        data={books}
                        handleBookClick={handleBookClick}
                        handleStatusChange={handleStatusChange}
                        // handleDelete={handleDelete}
                    />

                </CCardBody>
            </CCard>

            <CModal visible={modalOpen} onClose={handleCloseModal}>
                <CModalHeader>
                    <CModalTitle>Book Details</CModalTitle>
                </CModalHeader>
                <CModalBody style={{ display: "flex", justifyContent: "center" }}>
                    {selectedBook && (
                        <div>
                            <p><strong>Book cover photo</strong></p>
                            {selectedBook.cover_photo ? (
                                <img src={`http://localhost:8800/uploads/${selectedBook.cover_photo}`} alt={selectedBook.title} style={{ width: '100px', height: '100px' }} />
                            ) : (
                                <p>No Cover Photo</p>
                            )}

                            <p><strong>Title:</strong> {selectedBook.title}</p>
                            <p><strong>Author:</strong> {selectedBook.author}</p>
                            <p><strong>Type:</strong> {selectedBook.type_name}</p>
                            <p><strong>Genre:</strong> {selectedBook.genre_name}</p>
                            <p><strong>Publication:</strong> {selectedBook.publication}</p>
                            <p><strong>No of Pages:</strong> {selectedBook.pages}</p>
                            <p><strong>Price:</strong> {selectedBook.price}</p>
                            <p><strong>Active:</strong> {selectedBook.active === 1 ? "Yes" : "No"}</p>
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
