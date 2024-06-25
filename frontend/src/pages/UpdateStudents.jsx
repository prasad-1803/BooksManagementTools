import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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
    <div>
      <h1>Update Student</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <input type="text" name="grade" placeholder="Grade" value={formData.grade} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default UpdateStudents;
