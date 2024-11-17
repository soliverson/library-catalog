const db = require('../db/database');

const Book = {
  getAll: async () => db.query('SELECT * FROM Books'),
  getById: async (id) => db.query('SELECT * FROM Books WHERE id = $1', [id]),
  create: async (title, genre, year) =>
    db.query(
      'INSERT INTO Books (title, genre, year) VALUES ($1, $2, $3) RETURNING *',
      [title, genre, year]
    ),
  update: async (id, title, genre, year) =>
    db.query(
      'UPDATE Books SET title = $1, genre = $2, year = $3 WHERE id = $4 RETURNING *',
      [title, genre, year, id]
    ),
  delete: async (id) => db.query('DELETE FROM Books WHERE id = $1', [id]),
};

module.exports = Book;
