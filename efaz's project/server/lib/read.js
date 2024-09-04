const db = require('./database');

const getMessages = (req, res) => {
  const query = 'SELECT * FROM messages ORDER BY id DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      res.status(500).send('Error fetching messages');
    } else {
      res.json(results);
    }
  });
};

module.exports = getMessages;