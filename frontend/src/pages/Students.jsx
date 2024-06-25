import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '../../components/Table'; // Import the Table component
import {
  CCard, CCardBody, CCardHeader, CModal,
  CModalBody, CModalHeader, CModalTitle, CModalFooter, CButton
} from '@coreui/react';
const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get('http://localhost:8800/students');
            console.log(res.data);
            setStudents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (studentId) => {
        try {
            await axios.delete(`http://localhost:8800/students/${studentId}`);
            // Refresh the student list after deletion
            fetchStudents();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Students Management</h1>
            <CCard>
            <CCardHeader style={{ display: "flex", justifyContent: "space-between" }}>
                    Student List
                    <CButton color="primary">
                        <Link to="/students/add" style={{ color: 'white', textDecoration: 'none' }}>Add new Student</Link>
                    </CButton>
               </CCardHeader>
               <CCardBody> <Table data={students} handleDelete={handleDelete} /></CCardBody>
               </CCard>
            {/* Render the Table component to display student data */}
           
        </div>
    );
};

export default Students;
