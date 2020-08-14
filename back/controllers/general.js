// Imports
const Order = require('../models/order');
const Ingredient = require('../models/ingredient');

exports.postOrder = (req, res, next) => {
   const order = new Order({
      ingredients: req.body.ingredients,
      price: req.body.price,
      customer: req.body.customer
   });
   order.save()
      .then(result => {
         res.status(200).json({
            message: 'Order successfully created'
         });
      })
      .catch(error => {
         error.statusCode = 500;
         next(error);
      });
}

exports.getIngredients = (req, res, next) => {
   Ingredient.findOne({}, {_id: 0})
      .then(ingredients => {
         res.status(200).json(ingredients);
      })
      .catch(error => {
         error.statusCode = 500;
         next(error);
      });
}

exports.getOrders = (req, res, next) => {
   Order.find({}, {ingredients: 1, price: 1})
      .then(orders => {
         res.status(200).json(orders);
      })
      .catch(error => {
         error.statusCode = 500;
         next(error);
      });
}