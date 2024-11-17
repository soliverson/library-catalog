const db = require('../db/database');

const Author = {
  getAll: async () => db.query('SELECT * FROM Authors'),
  getById: async (id) => db.query('SELECT * FROM Authors WHERE id = $1', [id]),
  create: async (name, birthYear) =>
    db.query(
      'INSERT INTO Authors (name, birth_year) VALUES ($1, $2) RETURNING *',
      [name, birthYear]
    ),
  update: async (id, name, birthYear) =>
    db.query(
      'UPDATE Authors SET name = $1, birth_year = $2 WHERE id = $3 RETURNING *',
      [name, birthYear, id]
    ),
  delete: async (id) => db.query('DELETE FROM Authors WHERE id = $1', [id]),
};

module.exports = Author;
