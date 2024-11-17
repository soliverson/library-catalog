const db = require('../db/database');

// Get authors
exports.getAuthors = async (req, res) => {
  try {
    console.log("Fetching all authors from the database...");
    const result = await db.query('SELECT * FROM Authors ORDER BY id');
    console.log("Authors fetched:", result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching authors from database:", error);
    res.status(500).json({ error: 'Database error while fetching authors' });
  }
};

// Add new author
exports.addAuthor = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    console.error("Error: Missing 'name' in request body.");
    return res.status(400).json({ error: 'Author name is required' });
  }

  try {
    console.log("Inserting author into database with name:", name);
    const result = await db.query('INSERT INTO Authors (name) VALUES ($1) RETURNING *', [name]);
    console.log("Author added successfully:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding author to database:", error);
    res.status(500).json({ error: 'Database error while adding author' });
  }
};

// Update author
exports.updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const result = await db.query(
      'UPDATE Authors SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating author in database:", error);
    res.status(500).json({ error: 'Database error while updating author' });
  }
};

// Delete author
exports.deleteAuthor = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM Authors WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error("Error deleting author from database:", error);
    res.status(500).json({ error: 'Database error while deleting author' });
  }
};
