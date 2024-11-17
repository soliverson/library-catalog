# Overview

This project is a **Library Catalog Management System** designed to demonstrate proficiency in software engineering principles and SQL Relational Databases. The software makes it so that users can manage a library's collection of books, authors, and borrowing records. It features CRUD (Create, Read, Update, Delete) operations and integrates seamlessly with a relational database for data storage and retrieval.

The program allows users to add, edit, delete, and view books, authors, and borrowing transactions through an website.

The purpose of this software is to help me use databases, and building a user-friendly system.

[Software Demo Video](http://youtube.link.goes.here)

---

# Relational Database

The relational database used for this project is **PostgreSQL**. It is structured to support the relationships between books, authors, and borrowing records. The database contains the following tables:

1. **Authors**:

   - `id`: Primary Key, Unique Identifier
   - `name`: Author's name

2. **Books**:

   - `id`: Primary Key, Unique Identifier
   - `title`: Book title
   - `genre`: Genre of the book
   - `year`: Year of publication
   - `author_id`: Foreign Key referencing `Authors(id)`

3. **BorrowingRecords**:
   - `id`: Primary Key, Unique Identifier
   - `book_id`: Foreign Key referencing `Books(id)`
   - `borrow_date`: Date when the book was borrowed
   - `return_date`: Date when the book was returned

The database makes it so that the data is consistent.

---

# Development Environment

The following tools and technologies were used to develop the software:

- **Development Tools**:
  - VS Code
  - GitHub for version control
  - Render for deployment
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - PostgreSQL
  - pgAdmin for database management
- **Frontend**:
  - HTML, CSS, and JavaScript
- **Libraries and Frameworks**:
  - `pg` for PostgreSQL integration
  - `body-parser` for parsing HTTP request bodies
  - `dotenv` for environment variable management

---

# Useful Websites

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

# Future Work

- **Enhanced Borrowing Records**:
  - I could add in any fines for overdue books.
  - I could add in more information about the book, summaries, reviews, etc.
- **Search Functionality**:
  - I could add a search option for books, subjects, authors.
- **Reporting and Analytics**:
  - I could add which books were the most popular.
