import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CCard,
  CCardBody,
  CCardHeader
} from '@coreui/react';

const UpdateStudents = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    email: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchStudentDetails();
  }, [id]);

  const fetchStudentDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/students/${id}`);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/students/${id}`, formData);
      navigate('/students');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <h1>Update Student</h1>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <div>
            <CFormLabel htmlFor="name">Name</CFormLabel>
            <CFormInput
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <CFormLabel htmlFor="age">Age</CFormLabel>
            <CFormInput
              type="number"
              id="age"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <CFormLabel htmlFor="grade">Grade</CFormLabel>
            <CFormInput
              type="text"
              id="grade"
              name="grade"
              placeholder="Grade"
              value={formData.grade}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CFormInput
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <CButton type="submit" color="primary">Update Student</CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default UpdateStudents;
