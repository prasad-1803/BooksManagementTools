import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
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
    <div>
        <h1>Books Management Tools</h1>

        <div className='Books'>
            
          {books.map( (book) =>  (
                    <div className='book' key={book.BookID}>
                    {book.cover && <img src={book.Cover} alt="" />}
                    <h2>{book.Title}</h2>
                    <p>{book.Author}</p>
                    <span>{book.BookID}</span>
                    </div>
          ))}
            
        </div>

        <button><Link to="/Add">Add new book</Link></button>
    </div>
   
  )
}

export default Books