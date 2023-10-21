const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve the React Native landing page
app.use(express.static(path.join(__dirname, 'public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
