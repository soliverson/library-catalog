const db = require('../db/database');

// Total number of books
exports.getTotalBooks = async (req, res) => {
  try {
    const result = await db.query('SELECT COUNT(*) AS total_books FROM Books');
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching total books:', error);
    res.status(500).json({ error: 'Database error while fetching total books' });
  }
};

// Total books borrowed in a timeframe
exports.getBooksBorrowed = async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const result = await db.query(
      `
        SELECT COUNT(*) AS total_borrowed
        FROM BorrowingRecords
        WHERE borrow_date >= $1 AND borrow_date <= $2
      `,
      [start_date, end_date]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching books borrowed:', error);
    res.status(500).json({ error: 'Database error while fetching books borrowed' });
  }
};
