import React, { useState } from 'react'

const Add = () => {

const [book,setBook]=useState({
    title:"",
    desc:'',
    price:"",
    cover:"",
});

  return (
    <div className='form'>
 <h1>Add New Book</h1>
 <input type="text" placeholder='title'  name="title" />
 <input type="text" placeholder='desc' name="description"/>
 <input type="number" placeholder='price' name="price"/>
 <input type="text" placeholder='cover' name="cover"/>

    </div>
  )
}

export default Add