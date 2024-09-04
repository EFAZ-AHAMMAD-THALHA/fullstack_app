const express = require('express');
const createMessage = require('./create');
const getMessages = require('./read');
const updateMessage = require('./update');
const deleteMessage = require('./delete');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/messages', createMessage);
app.get('/messages', getMessages);
app.put('/messages', updateMessage);
app.delete('/messages', deleteMessage);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});