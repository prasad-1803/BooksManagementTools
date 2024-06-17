import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CContainer,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol
} from '@coreui/react';

const UpdateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [typeId, setTypeId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [publication, setPublication] = useState('');
  const [pages, setPages] = useState('');
  const [price, setPrice] = useState('');
  const [cover, setCover] = useState(null);
  const [existingCover, setExistingCover] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${bookId}`);
        const book = res.data;
        setTitle(book.title);
        setAuthor(book.author);
        setTypeId(book.type_id);
        setGenreId(book.genre_id);
        setPublication(book.publication);
        setPages(book.pages);
        setPrice(book.price);
        setExistingCover(book.cover_photo);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('type_id', typeId);
    formData.append('genre_id', genreId);
    formData.append('publication', publication);
    formData.append('pages', pages);
    formData.append('price', price);
    if (cover) {
      formData.append('cover', cover);
    } else {
      formData.append('cover_photo', existingCover);
    }

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, formData);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CContainer style={{ padding: '40px', margin: '100px' }}>
      <CRow className="justify-content-center">
        <CCol md="8">
          <CCard>
            <CCardHeader style={{ marginBottom: '20px' }}>
              <h1>Update a book details</h1>
            </CCardHeader>
            <CCardBody style={{ padding: '20px' }}>
              <CForm onSubmit={handleSubmit}>
                <div>
                  <CFormLabel htmlFor="title">Title</CFormLabel>
                  <CFormInput
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <CFormLabel htmlFor="author">Author</CFormLabel>
                  <CFormInput
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <CFormLabel htmlFor="type_id">Type</CFormLabel>
                  <CFormSelect
                    id="type_id"
                    value={typeId}
                    onChange={(e) => setTypeId(e.target.value)}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="1">Auto-biography</option>
                    <option value="2">Novel</option>
                    <option value="3">Stories</option>
                    <option value="4">Poems</option>
                  </CFormSelect>
                </div>
                <div>
                  <CFormLabel htmlFor="genre_id">Genre</CFormLabel>
                  <CFormSelect
                    id="genre_id"
                    value={genreId}
                    onChange={(e) => setGenreId(e.target.value)}
                    required
                  >
                    <option value="">Select Genre</option>
                    <option value="1">History</option>
                    <option value="2">Science</option>
                    <option value="3">Arts</option>
                    <option value="4">Science Fiction</option>
                  </CFormSelect>
                </div>
                <div>
                  <CFormLabel htmlFor="publication">Publication</CFormLabel>
                  <CFormInput
                    type="text"
                    id="publication"
                    value={publication}
                    onChange={(e) => setPublication(e.target.value)}
                    required
                  />
                </div>
                <div >
                  <CFormLabel htmlFor="pages">No of Pages</CFormLabel>
                  <CFormInput
                    type="number"
                    id="pages"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    required
                  />
                </div>
                <div >
                  <CFormLabel htmlFor="price">Price</CFormLabel>
                  <CFormInput
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div >
                  <CFormLabel htmlFor="cover">Cover Photo</CFormLabel>
                  <CFormInput
                    type="file"
                    id="cover"
                    onChange={(e) => setCover(e.target.files[0])}
                  />
                </div>
                <CButton type="submit" color="primary">Update Book</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default UpdateBook;
