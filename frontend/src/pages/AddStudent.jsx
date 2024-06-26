import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  CCol,
  CAlert // Added for displaying validation errors
} from '@coreui/react';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    email: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate age
    const age = parseInt(formData.age);
    if (isNaN(age) || age <= 0 || age > 50) {
      setError('Please enter a valid age.');
      return;
    }

    // Validate grade
    const validGrades = ['A', 'B', 'C', 'D'];
    if (!validGrades.includes(formData.grade.toUpperCase())) {
      setError('Grade should be A, B, C, or D.');
      return;
    }

    try {
      await axios.post('http://localhost:8800/addstudent', formData);
      navigate('/students');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard>
            <CCardHeader>
              <h1>Add Student</h1>
            </CCardHeader>
            <CCardBody>
              {error && <CAlert color="danger">{error}</CAlert>} {/* Display error message */}
              <CForm onSubmit={handleSubmit}>
                <CFormLabel>Name</CFormLabel>
                <CFormInput type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} required />

                <CFormLabel>Age</CFormLabel>
                <CFormInput type="number" name="age" placeholder="Enter age" value={formData.age} onChange={handleChange} required />

                <CFormLabel>Grade</CFormLabel>
                <CFormInput type="text" name="grade" placeholder="Enter grade (A, B, C, D)" value={formData.grade} onChange={handleChange} required />

                <CFormLabel>Email</CFormLabel>
                <CFormInput type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />

                <CButton type="submit" color="primary">Add Student</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AddStudent;
