// Imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/general');

// Initialization
const app = express();
const MONGO_DB_URI = 'mongodb+srv://giggs:123@cluster0.wwnlt.mongodb.net/burgerbuilder?retryWrites=true&w=majority'

// Allow cross-origin resource sharing (CORS)
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});

// Data parsing
app.use(bodyParser.json());

// Route handling
app.use(routes);

// Error handling
app.use((err, req, res, next) => {
   const code = err.statusCode;
   const message = err.message;
   res.status(code).json({reason: message});
});

// Connect to database
mongoose.connect(MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => {
      // Start server
      app.listen(8080);
   });

