const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Get all authors
router.get('/', authorController.getAuthors);

// Add a new author
router.post('/', authorController.addAuthor);

// Update an author
router.put('/:id', authorController.updateAuthor);

// Delete an author
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
