import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IssuedBooksReport = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8800/issued-books');
      setIssuedBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Issued Books Report</h1>
      <ul>
        {issuedBooks.map(record => (
          <li key={record.id}>
            Book: {record.book_title} issued to {record.student_name} on {record.issue_date} 
            {record.return_date ? ` and returned on ${record.return_date}` : ' and not yet returned'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssuedBooksReport;
