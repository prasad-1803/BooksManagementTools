import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import UpdateStudents from "./pages/UpdateStudents";
import IssueAndReturnBook from "./pages/IssueAndReturnBook";
import IssuedBooksReport from "./pages/IssuedBooksReport";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/update/:id" element={<UpdateBook />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/update/:id" element={<UpdateStudents />} />
          <Route path="/issue-return" element={<IssueAndReturnBook />} />
          <Route path="/issued-books-report" element={<IssuedBooksReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
