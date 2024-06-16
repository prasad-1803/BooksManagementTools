import React, { useEffect, useState } from 'react'; // Importing necessary hooks from React
import axios from 'axios'; // Importing axios for HTTP requests
import { Link } from 'react-router-dom'; // Importing Link for navigation
import {
    CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow,
    CTableHeaderCell, CTableBody, CTableDataCell, CButton, CModal,
    CModalBody, CModalHeader, CModalTitle, CModalFooter
} from '@coreui/react'; // Importing CoreUI components for UI
import '@coreui/coreui/dist/css/coreui.min.css'; // Importing CoreUI CSS

const Books = () => {
    // State to store the list of books
    const [books, setBooks] = useState([]);
    // State to control the visibility of the modal
    const [modalOpen, setModalOpen] = useState(false);
    // State to store the currently selected book for the modal
    const [selectedBook, setSelectedBook] = useState(null);

    // Fetch all books from the backend when the component mounts
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                console.log(res.data); // Debug: log the fetched data
                setBooks(res.data); // Update the books state with fetched data
            } catch (err) {
                console.log(err); // Log any error that occurs during the fetch
            }
        };

        fetchAllBooks(); // Call the fetch function
    }, []); // Empty dependency array means this effect runs once on mount

    // Handle book click to show modal with book details
    const handleBookClick = (book) => {
        console.log('Book clicked:', book); // Debug: log the clicked book
        setSelectedBook(book); // Set the selected book state
        setModalOpen(true); // Open the modal
    };

    // Handle closing of the modal
    const handleCloseModal = () => {
        console.log('Closing modal'); // Debug: log when closing modal
        setModalOpen(false); // Close the modal
        setSelectedBook(null); // Reset the selected book state
    };

    return (
        <div className='home'>
            <h1>Books Management Tool</h1>

            <CCard>
                <CCardHeader>Books List</CCardHeader>
                <CCardBody>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                {/* Table headers */}
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
                            {/* Map over books array to render each book as a table row */}
                            {books.map((book) => (
                                <CTableRow key={book.id} onClick={() => handleBookClick(book)}>
                                    {/* Table data cells */}
                                    <CTableDataCell>{book.title}</CTableDataCell>
                                    <CTableDataCell>{book.author}</CTableDataCell>
                                    <CTableDataCell>{book.type_id}</CTableDataCell>
                                    <CTableDataCell>{book.genre_id}</CTableDataCell>
                                    <CTableDataCell>{book.publication}</CTableDataCell>
                                    <CTableDataCell>{book.pages}</CTableDataCell>
                                    <CTableDataCell>{book.price}</CTableDataCell>
                                    <CTableDataCell>
                                        {/* Render cover image if available, otherwise show 'N/A' */}
                                        {book.cover ? <img src={book.cover} alt={book.title} style={{ width: '50px', height: '50px' }} /> : 'N/A'}
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>

            <CButton color="primary">
                {/* Link to the Add New Book page */}
                <Link to="/add" style={{ color: 'white', textDecoration: 'none' }}>Add new book</Link>
            </CButton>

            {/* Modal to show book details */}
            <CModal visible={modalOpen} onClose={handleCloseModal}>
                <CModalHeader>
                    <CModalTitle>Book Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {selectedBook && (
                        <div>
                            {/* Display book details */}
                            <p><strong>Title:</strong> {selectedBook.title}</p>
                            <p><strong>Author:</strong> {selectedBook.author}</p>
                            <p><strong>Type:</strong> {selectedBook.type_id}</p>
                            <p><strong>Genre:</strong> {selectedBook.genre_id}</p>
                            <p><strong>Publication:</strong> {selectedBook.publication}</p>
                            <p><strong>No of Pages:</strong> {selectedBook.pages}</p>
                            <p><strong>Price:</strong> {selectedBook.price}</p>
                            {selectedBook.cover ? (
                                <img src={selectedBook.cover} alt={selectedBook.title} style={{ width: '100px', height: '100px' }} />
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
