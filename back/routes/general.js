// Imports
const express = require('express');
const controller = require('../controllers/general');

// Initialization
const router = express.Router();

// Routes
router.post('/order', controller.postOrder);
router.get('/ingredients', controller.getIngredients);

// Export
module.exports = router;