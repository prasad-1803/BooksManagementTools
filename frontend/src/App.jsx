
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import Books from './pages/Books';
import Update from './pages/Update';
import { CContainer, CHeader, CFooter, CSidebar, CSidebarNav, CSidebarBrand, CSidebarToggler, CNavItem, CNavLink } from '@coreui/react';


import './App.css'

function App() {
  

  return (
    <div className='App'>
       <Router>
        <Routes>
        
            <Route path="/" element={<Books/>}/>
            <Route path="/add" element={<Add/>}/>
            <Route path="/update" element={<Update/>}/>


        
        </Routes>
       </Router> 
    
    </div>
  )
}

export default App
