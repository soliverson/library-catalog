const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Get all books
router.get('/', bookController.getBooks);

// Add a new book
router.post('/', bookController.addBook);

// Update a book
router.put('/:id', bookController.updateBook);

// Delete a book
router.delete('/:id', bookController.deleteBook);

module.exports = router;
