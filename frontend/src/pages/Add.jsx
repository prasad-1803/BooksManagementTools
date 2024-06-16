import React, { useState } from 'react'

const Add = () => {

const [book,setBook]=useState({
    title:"",
    desc:'',
    price:"",
    cover:"",
});

const handleChange=(e)=>{
    setBook(prev=>({...prev,[e.target.name]: e.target.value}))
   
}
console.log(book); 
const handleClick=async e=>{
    e.preventDefault()
}
  return (
    <div className='form'>
 <h1>Add New Book</h1>
 <input type="text" placeholder='title' onChange={handleChange} name="title" />
 <input type="text" placeholder='desc' onChange={handleChange} name="description"/>
 <input type="number" placeholder='price' onChange={handleChange} name="price"/>
 <input type="text" placeholder='cover' onChange={handleChange} name="cover"/>

<button onClick={handleClick} >Add</button>
    </div>
  )
}

export default Add