document.addEventListener('DOMContentLoaded', () => {
  const bookList = document.getElementById('book-list');
  const authorList = document.getElementById('author-list');
  const borrowingList = document.getElementById('borrowing-records');
  const addBookForm = document.getElementById('add-book-form');
  const addAuthorForm = document.getElementById('add-author-form');
  const borrowingForm = document.getElementById('add-borrowing-form');
  const bookAuthorDropdown = document.getElementById('book-author');
  const borrowingBookDropdown = document.getElementById('borrowing-book');

  // Fetch authors and populate dropdown and list
  const fetchAuthors = async () => {
    try {
      const response = await fetch('/authors');
      if (!response.ok) throw new Error('Failed to fetch authors');
      const authors = await response.json();

      bookAuthorDropdown.innerHTML = '<option value="" disabled selected>Select Author</option>';
      authorList.innerHTML = '';

      authors.forEach((author) => {
        const option = document.createElement('option');
        option.value = author.id;
        option.textContent = author.name;
        bookAuthorDropdown.appendChild(option);

        const authorElement = document.createElement('div');
        authorElement.innerHTML = `
          ${author.name}
          <button onclick="editAuthor(${author.id}, '${author.name}')">Edit</button>
          <button onclick="deleteAuthor(${author.id})">Delete</button>
        `;
        authorList.appendChild(authorElement);
      });
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  // Fetch books and populate dropdown and list
  const fetchBooks = async () => {
    try {
      const response = await fetch('/books');
      if (!response.ok) throw new Error('Failed to fetch books');
      const books = await response.json();

      borrowingBookDropdown.innerHTML = '<option value="" disabled selected>Select Book</option>';
      bookList.innerHTML = '';

      books.forEach((book) => {
        const option = document.createElement('option');
        option.value = book.id;
        option.textContent = book.title;
        borrowingBookDropdown.appendChild(option);

        const bookElement = document.createElement('div');
        bookElement.innerHTML = `
          ${book.title} (${book.genre || 'No Genre'}, ${book.year || 'No Year'})
          <button onclick="editBook(${book.id}, '${book.title}', '${book.genre}', ${book.year || null})">Edit</button>
          <button onclick="deleteBook(${book.id})">Delete</button>
        `;
        bookList.appendChild(bookElement);
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Fetch borrowing records
  const fetchBorrowingRecords = async () => {
    try {
      console.log('Fetching borrowing records...');
      const response = await fetch('/borrowing-records');
      if (!response.ok) throw new Error('Failed to fetch borrowing records');
      const records = await response.json();
      console.log('Fetched borrowing records:', records);

      borrowingList.innerHTML = '';

      records.forEach((record) => {
        const recordElement = document.createElement('div');
        recordElement.innerHTML = `
          <strong>${record.book_title}</strong> - Borrowed on: ${record.borrow_date}
          ${record.return_date ? `, Returned on: ${record.return_date}` : ''}
          <button onclick="editBorrowingRecord(${record.id}, '${record.borrow_date}', '${record.return_date || ''}')">Edit</button>
          <button onclick="deleteBorrowingRecord(${record.id})">Delete</button>
        `;
        borrowingList.appendChild(recordElement);
      });

      console.log('Borrowing records updated successfully.');
    } catch (error) {
      console.error('Error fetching borrowing records:', error);
    }
  };

  // Add a new book
  addBookForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('book-title').value;
    const genre = document.getElementById('book-genre').value;
    const year = document.getElementById('book-year').value;
    const authorId = document.getElementById('book-author').value;

    try {
      const response = await fetch('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre, year, author_id: authorId }),
      });
      if (!response.ok) throw new Error('Failed to add book');
      await response.json();
      fetchBooks();
      addBookForm.reset();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  });

  // Add a new author
  addAuthorForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('author-name').value;

    try {
      const response = await fetch('/authors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error('Failed to add author');
      await response.json();
      fetchAuthors();
      addAuthorForm.reset();
    } catch (error) {
      console.error('Error adding author:', error);
    }
  });

  // Add a new borrowing record
  borrowingForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const bookId = document.getElementById('borrowing-book').value;
    const borrowDate = document.getElementById('borrow-date').value;
    const returnDate = document.getElementById('return-date').value || null;

    try {
      const response = await fetch('/borrowing-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ book_id: bookId, borrow_date: borrowDate, return_date: returnDate }),
      });
      if (!response.ok) throw new Error('Failed to add borrowing record');
      await response.json();
      fetchBorrowingRecords();
      borrowingForm.reset();
    } catch (error) {
      console.error('Error adding borrowing record:', error);
    }
  });

  // Edit book
  window.editBook = async (id, title, genre, year) => {
    const newTitle = prompt('Edit Title:', title) || title;
    const newGenre = prompt('Edit Genre:', genre) || genre;
    const newYear = prompt('Edit Year:', year) || year;
    const authorId = prompt('Enter Author ID (leave blank to keep current):') || null;

    try {
      await fetch(`/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, genre: newGenre, year: newYear, author_id: authorId }),
      });
      fetchBooks();
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  // Delete book
  window.deleteBook = async (id) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    try {
      await fetch(`/books/${id}`, { method: 'DELETE' });
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Edit author
  window.editAuthor = async (id, name) => {
    const newName = prompt('Edit Author Name:', name) || name;

    try {
      await fetch(`/authors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      fetchAuthors();
    } catch (error) {
      console.error('Error editing author:', error);
    }
  };

  // Delete author
  window.deleteAuthor = async (id) => {
    if (!confirm('Are you sure you want to delete this author?')) return;
    try {
      await fetch(`/authors/${id}`, { method: 'DELETE' });
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  // Edit borrowing record
  window.editBorrowingRecord = async (id, borrowDate, returnDate) => {
    const newBorrowDate = prompt('Edit Borrow Date (YYYY-MM-DD):', borrowDate) || borrowDate;
    const newReturnDate = prompt('Edit Return Date (YYYY-MM-DD):', returnDate) || returnDate || null;

    try {
      await fetch(`/borrowing-records/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ borrow_date: newBorrowDate, return_date: newReturnDate }),
      });
      fetchBorrowingRecords();
    } catch (error) {
      console.error('Error editing borrowing record:', error);
    }
  };

  // Delete borrowing record
  window.deleteBorrowingRecord = async (id) => {
    if (!confirm('Are you sure you want to delete this borrowing record?')) return;
    try {
      await fetch(`/borrowing-records/${id}`, { method: 'DELETE' });
      fetchBorrowingRecords();
    } catch (error) {
      console.error('Error deleting borrowing record:', error);
    }
  };

  // Fetch initial data
  fetchAuthors();
  fetchBooks();
  fetchBorrowingRecords();
});
