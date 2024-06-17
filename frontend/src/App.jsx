
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddBook from './pages/AddBook';
import Books from './pages/Books';
import UpdateBook from './pages/UpdateBook';
import { CContainer, CHeader, CFooter, CSidebar, CSidebarNav, CSidebarBrand, CSidebarToggler, CNavItem, CNavLink } from '@coreui/react';


import './App.css'

function App() {
  

  return (
    <div className='App'>
       <Router>
        <Routes>
        
            <Route path="/" element={<Books/>}/>
            <Route path="/add" element={<AddBook/>}/>
            <Route path="/update/:id" element={<UpdateBook/>}/>


        
        </Routes>
       </Router> 
    
    </div>
  )
}

export default App
