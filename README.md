![linux foundation cer](https://github.com/prasad-1803/BooksManagementTools/assets/113035638/a6fc2a0f-7fdd-4170-a454-fd1a9f889fd2)# BooksManagementTools


The Book Management Tool is a web application designed to help users manage a collection of books. Users can add, update, deactivate, and view details of books in their collection. The application is built using React for the frontend and Node.js with Express for the backend, and it uses MySQL for the database.

# Features
- Add a New Book: Users can add a new book to the collection by      providing details such as title, author, type, genre, publication, pages, price, and an optional cover photo.
- View Book List: Users can view a list of all books in the collection.
- Update Book Details: Users can update the details of any book in the collection.
- Deactivate a Book: Users can deactivate any book from the collection.
View Book Details: Users can click on a book to view detailed information, including the cover photo if available.!

# New Fetures -
- Student Master – List, Add Student, Update Student
- Issue & Return of Books to Students & From Students
- Report to see book issued to which student
- Create single component based code for table list

  # New Screenshots-
![home](https://github.com/prasad-1803/BooksManagementTools/assets/113035638/9a9632e1-d48b-46a0-b24f-772cf6ccda55)
![issue](https://github.com/prasad-1803/BooksManagementTools/assets/113035638/7f02975a-9a21-4044-b4a8-3f6564b7f01e)
![issuedbookreport](https://github.com/prasad-1803/BooksManagementTools/assets/113035638/904da03d-e2b7-45f7-a465-f2122be8df06)
![return](https://github.com/prasad-1803/BooksManagementTools/assets/113035638/7def9fa2-9400-4b25-a387-8f64ce152df5)
![reutunbookreport](https://github.com/prasad-1803/BooksManagementTools/assets/113035638/ede0408a-a691-4b4e-b8b8-8db7811aaa2b)


# Screenshots-
![homepage](https://github.com/prasad-1803/BooksManagementTools/assets/113035638/b4079d73-7c2e-4cd7-b4af-54e2eb1005bf)
![book details page2](https://github.com/prasad-1803/BooksManagementTools/assets/113035638/86e55f4d-21fb-4303-a899-396261cd82d6)
![boodetailspage](https://github.com/prasad-1803/BooksManagementTools/assets/113035638/962ce365-f83f-4fdc-9999-5024756e4bd9)
![Screenshot 2024-06-18 003403](https://github.com/prasad-1803/BooksManagementTools/assets/113035638/7a1aa91f-c974-4780-a7fb-d4d056b001b8)
![Screenshot 2024-06-18 002223](https://github.com/prasad-1803/BooksManagementTools/assets/113035638/17444e49-1a48-4a3c-b760-ec3c515e7761)


# Technologies Used
- Frontend: React, Axios, React Router, CoreUI
- Backend: Node.js, Express, Multer (for file uploads)
- Database: MySQL

# Installation
-  **Clone the repository**

   ```bash
   git clone https://github.com/your-username/library-management-system.git
- create database schema as per xls sheet.
- table genreofbook and typesofbook ,Ensure these tables are populated with data before adding books.
- Data Integrity: By defining genres and book types beforehand, you ensure that each book entry references valid and existing genres and types. This prevents invalid data from being inserted into the books table.
Consistency: Having predefined genres and types ensures consistent data entry. For instance, it avoids discrepancies like “Science Fiction” vs. “Sci-Fi,” which could lead to data inconsistencies.
- Database Normalization:In relational database design, normalization is the process of organizing data to reduce redundancy and improve data integrity. By separating genres and types into their own tables, you 
 adhere to normalization principles, ensuring each piece of data is stored only once.
- Foreign Key Constraints: When you add books, each book entry will reference existing genres and types via foreign keys. These constraints ensure that every reference to a genre or type in the books table corresponds to a valid entry in the genres or typesofbook table.

- add .env ,passwords etc.
  
  ```bash 
   cd BooksManagementTools
   cd backend
   npm install
   npm start
   cd ..
   cd frontend
   npm install
   npm run dev


   
# Contact
For any inquiries, please contact [pfirame18@example.com].
