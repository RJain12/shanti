const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.get('/src/site/stability.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, 'src', 'site', 'stability.js'));
});

app.get('/viewer', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'site', 'viewer.html'));
});

app.get('/viewer2', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'site', 'viewer2.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'site', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});