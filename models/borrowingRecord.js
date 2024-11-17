const db = require('../db/database');

const BorrowingRecord = {
  getAll: async () => db.query('SELECT * FROM BorrowingRecords'),
  getById: async (id) =>
    db.query('SELECT * FROM BorrowingRecords WHERE id = $1', [id]),
  create: async (bookId, borrowDate, returnDate) =>
    db.query(
      'INSERT INTO BorrowingRecords (book_id, borrow_date, return_date) VALUES ($1, $2, $3) RETURNING *',
      [bookId, borrowDate, returnDate]
    ),
  update: async (id, bookId, borrowDate, returnDate) =>
    db.query(
      'UPDATE BorrowingRecords SET book_id = $1, borrow_date = $2, return_date = $3 WHERE id = $4 RETURNING *',
      [bookId, borrowDate, returnDate, id]
    ),
  delete: async (id) => db.query('DELETE FROM BorrowingRecords WHERE id = $1', [id]),
};

module.exports = BorrowingRecord;
