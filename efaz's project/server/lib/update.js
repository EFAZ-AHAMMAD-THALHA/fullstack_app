const db = require('./database');

const updateMessage = (req, res) => {
  const { id, name, content } = req.body;
  const query = 'UPDATE messages SET name = ?, content = ? WHERE id = ?';

  db.query(query, [name, content, id], (err, result) => {
    if (err) {
      console.error('Error updating message:', err);
      res.status(500).send('Error updating message');
    } else {
      res.send('Message updated successfully');
    }
  });
};

module.exports = updateMessage;