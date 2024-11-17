const db = require('../db/database');

// Get all borrowing records
exports.getBorrowingRecords = async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const query = `
      SELECT BorrowingRecords.id, Books.title AS book_title, BorrowingRecords.borrow_date, BorrowingRecords.return_date
      FROM BorrowingRecords
      JOIN Books ON BorrowingRecords.book_id = Books.id
      WHERE ($1::date IS NULL OR borrow_date >= $1)
        AND ($2::date IS NULL OR borrow_date <= $2)
      ORDER BY BorrowingRecords.borrow_date DESC
    `;
    const params = [start_date || null, end_date || null];
    const result = await db.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching borrowing records:', error);
    res.status(500).json({ error: 'Failed to fetch borrowing records' });
  }
};

// Add a new borrowing record
exports.addBorrowingRecord = async (req, res) => {
  const { book_id, borrow_date, return_date } = req.body;

  if (!book_id || !borrow_date) {
    return res.status(400).json({ error: 'Book and borrow date are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO BorrowingRecords (book_id, borrow_date, return_date) VALUES ($1, $2, $3) RETURNING *',
      [book_id, borrow_date, return_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding borrowing record:', error);
    res.status(500).json({ error: 'Failed to add borrowing record' });
  }
};

// Update a borrowing record
exports.updateBorrowingRecord = async (req, res) => {
  const { id } = req.params;
  const { borrow_date, return_date } = req.body;

  try {
    const result = await db.query(
      'UPDATE BorrowingRecords SET borrow_date = $1, return_date = $2 WHERE id = $3 RETURNING *',
      [borrow_date, return_date, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Borrowing record not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating borrowing record:', error);
    res.status(500).json({ error: 'Failed to update borrowing record' });
  }
};

// Delete a borrowing record
exports.deleteBorrowingRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM BorrowingRecords WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Borrowing record not found' });
    }
    res.status(200).json({ message: 'Borrowing record deleted successfully' });
  } catch (error) {
    console.error('Error deleting borrowing record:', error);
    res.status(500).json({ error: 'Failed to delete borrowing record' });
  }
};
