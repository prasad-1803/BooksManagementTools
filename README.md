# BooksManagementTools


The Book Management Tool is a web application designed to help users manage a collection of books. Users can add, update, delete, and view details of books in their collection. The application is built using React for the frontend and Node.js with Express for the backend, and it uses MySQL for the database.

# Features
- Add a New Book: Users can add a new book to the collection by      providing details such as title, author, type, genre, publication, pages, price, and an optional cover photo.
- View Book List: Users can view a list of all books in the collection.
- Update Book Details: Users can update the details of any book in the collection.
- Delete a Book: Users can delete any book from the collection.
View Book Details: Users can click on a book to view detailed information, including the cover photo if available.
# Technologies Used
- Frontend: React, Axios, React Router, CoreUI
- Backend: Node.js, Express, Multer (for file uploads)
- Database: MySQL
# Installation
 - Prerequisites
Node.js
npm (Node Package Manager)
MySQL
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/book-management-tool.git
cd book-management-tool
Install backend dependencies:

bash
Copy code
cd backend
npm install
Install frontend dependencies:

bash
Copy code
cd ../frontend
npm install
Set up the MySQL database:

Create a new database in MySQL.

Create a .env file in the backend directory and add the following environment variables:

env
Copy code
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
Run the following command to set up the database schema:

bash
Copy code
node backend/setupDatabase.js
Run the backend server:

bash
Copy code
cd backend
npm start
Run the frontend server:

bash
Copy code
cd ../frontend
npm start
Open the application:

Open your browser and navigate to http://localhost:3000.

# Project Structure
Frontend (React)
src/components: Contains React components (AddBook, Books, etc.).
src/App.js: Main application component.
src/index.js: Entry point for the React application.
public: Contains the public assets and index.html.
Backend (Node.js)
index.js: Entry point for the backend server.
routes: Contains route definitions.
controllers: Contains route handlers.
models: Contains Sequelize models.
uploads: Directory for storing uploaded cover photos.
setupDatabase.js: Script to set up the database schema.
API Endpoints
GET /books: Fetch all books.
POST /addbooks: Add a new book.
PUT /books/
: Update an existing book.
DELETE /books/
: Delete a book.
GET /uploads/
: Fetch an uploaded cover photo.

# Example Usage
Add a Book
Navigate to the "Add New Book" page.
Fill out the form with the book's details.
Click "Add Book".
View Book Details
Click on a book from the list.
A modal will appear displaying the book's details.
Update a Book
Click on the "Update" button next to a book in the list.
Modify the book's details in the form.
Click "Update Book".
Delete a Book
Click on the "Delete" button next to a book in the list.
Confirm the deletion.
Screenshots



# Contributing
Fork the repository.
Create your feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -am 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Create a new Pull Request.
License
This project is licensed under the MIT License.

# Contact
For any inquiries, please contact [pfirame18@example.com].