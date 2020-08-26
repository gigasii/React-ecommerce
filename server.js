// Imports
const express = require('express');
const path = require('path');

// Initialization
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'front/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname + '/front/build/index.html'));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port);