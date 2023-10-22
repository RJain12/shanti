const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.get('/viewer', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'viewer.html'));
});

app.get('/viewer2', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'viewer2.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});