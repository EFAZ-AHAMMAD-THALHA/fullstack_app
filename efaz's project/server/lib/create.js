const db = require('./database');

const createMessage = (req, res) => {
  const { name, content } = req.body;
  const query = 'INSERT INTO messages (name, content) VALUES (?, ?)';

  db.query(query, [name, content], (err, result) => {
    if (err) {
      console.error('Error creating message:', err);
      res.status(500).send('Error creating message');
    } else {
      res.status(201).send('Message created successfully');
    }
  });
};

module.exports = createMessage;