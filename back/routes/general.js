// Imports
const express = require('express');
const controller = require('../controllers/general');
const {body} = require('express-validator');
const auth = require('../middleware/auth');

// Initialization
const router = express.Router();

// Routes
router.get('/ingredients', controller.getIngredients);
router.get('/orders', auth, controller.getOrders);
router.post('/signup', controller.postSignup);
router.post('/login', controller.postLogin);

router.post('/order', auth,
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