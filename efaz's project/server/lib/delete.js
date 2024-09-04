const db = require('./database');

const deleteMessage = (req, res) => {
  const { id } = req.body;
  const query = 'DELETE FROM messages WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting message:', err);
      res.status(500).send('Error deleting message');
    } else {
      res.send('Message deleted successfully');
    }
  });
};

module.exports = deleteMessage;