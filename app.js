const express = require('express');
const app = express();

// Define a basic route
app.get('/', (req, res) => {
  res.send('Helloasdasd!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
