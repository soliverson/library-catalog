const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController');

// Get all borrowing records (with optional date filtering)
router.get('/', borrowingController.getBorrowingRecords);

// Add a new borrowing record
router.post('/', borrowingController.addBorrowingRecord);

// Update a borrowing record
router.put('/:id', borrowingController.updateBorrowingRecord);

// Delete a borrowing record
router.delete('/:id', borrowingController.deleteBorrowingRecord);

module.exports = router;
