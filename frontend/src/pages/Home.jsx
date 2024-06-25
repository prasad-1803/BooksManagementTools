// src/pages/Home.jsx
import React from 'react';
import { CButton, CContainer, CRow, CCol } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <CContainer className="mt-5">
      <CRow className="justify-content-center">
        <CCol md="8" className="text-center">
          <h1>Welcome to the Library Management System</h1>
          <p>Select an option below to get started:</p>
          <div className="d-grid gap-2 d-md-block">
            <CButton
              color="primary"
              size="lg"
              className="m-2"
              onClick={() => handleNavigation('/books')}
            >
              Manage Books
            </CButton>
            <CButton
              color="primary"
              size="lg"
              className="m-2"
              onClick={() => handleNavigation('/students')}
            >
              Manage Students
            </CButton>
            <CButton
              color="primary"
              size="lg"
              className="m-2"
              onClick={() => handleNavigation('/issuereturn')}
            >
              IssueBooks
            </CButton>
            <CButton
              color="success"
              size="lg"
              className="m-2"
              onClick={() => handleNavigation('/issuedbooksreport')}
            >
              Report of Issued Books
            </CButton>
            
          </div>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Home;
