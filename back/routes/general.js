// Imports
const express = require('express');
const controller = require('../controllers/general');
const {body} = require('express-validator');

// Initialization
const router = express.Router();

// Routes
router.get('/ingredients', controller.getIngredients);
router.get('/orders', controller.getOrders);
router.post('/order',
[
   body('customer.name', 'name')
      .notEmpty()
      .isAlpha()
      .trim(),
   body('customer.email', 'email')
      .notEmpty()
      .isEmail()
      .normalizeEmail(),
   body('customer.street', 'street')
      .notEmpty(),
   body('customer.zipCode', 'zipCode')
      .notEmpty()
      .isNumeric()
],
controller.postOrder);

// Export
module.exports = router;