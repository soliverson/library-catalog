const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

router.get('/total-books', statsController.getTotalBooks);
router.get('/books-borrowed', statsController.getBooksBorrowed);

module.exports = router;
