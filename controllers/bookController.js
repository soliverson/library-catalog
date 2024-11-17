const db = require('../db/database');

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT Books.id, Books.title, Books.genre, Books.year, Authors.name AS author_name
      FROM Books
      LEFT JOIN Authors ON Books.author_id = Authors.id
      ORDER BY Books.id
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error while fetching books' });
  }
};

// Add new book
exports.addBook = async (req, res) => {
  const { title, genre, year, author_id } = req.body;

  if (!title || !author_id) {
    return res.status(400).json({ error: 'Title and Author are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO Books (title, genre, year, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, genre, year, author_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error while adding book' });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, genre, year, author_id } = req.body;

  try {
    const result = await db.query(
      'UPDATE Books SET title = $1, genre = $2, year = $3, author_id = $4 WHERE id = $5 RETURNING *',
      [title, genre, year, author_id, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error while updating book' });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM Books WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error while deleting book' });
  }
};
