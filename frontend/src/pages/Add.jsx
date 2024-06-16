 //
import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [typeId, setTypeId] = useState('');
  const [genreId, setGenreId] = useState('');
  const [publication, setPublication] = useState('');
  const [pages, setPages] = useState('');
  const [price, setPrice] = useState('');
  const [cover, setCover] = useState(null);
  

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
    formData.append('cover', cover);

    try {
      await axios.post('http://localhost:8800/addbooks', formData);
    
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label htmlFor="type_id">Type:</label>
        <select
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
        </select>

        <label htmlFor="genre_id">Genre:</label>
        <select
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
        </select>

        <label htmlFor="publication">Publication:</label>
        <input
          type="text"
          id="publication"
          value={publication}
          onChange={(e) => setPublication(e.target.value)}
          required
        />

        <label htmlFor="pages">No of Pages:</label>
        <input
          type="number"
          id="pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="cover">Cover Photo:</label>
        <input
          type="file"
          id="cover"
          onChange={(e) => setCover(e.target.files[0])}
        />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
