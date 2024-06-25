import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:8800/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Students</h1>
      <Link to="/students/add">Add Student</Link>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} ({student.email}) - {student.grade}
            <Link to={`/students/update/${student.id}`}>Update</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;

