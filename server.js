// server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get('/about', (req, res) => {
  res.send('This is the About page.');
});

app.get('/api/data', (req, res) => {
  res.json({ name: 'Tadson', role: 'Developer' });
});