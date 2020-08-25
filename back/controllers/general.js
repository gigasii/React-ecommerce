// Imports
const Order = require('../models/order');
const Ingredient = require('../models/ingredient');
const User = require('../models/user');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.postOrder = (req, res, next) => {
   // Validation
   const errors = validationResult(req);
   if (!errors.isEmpty()) 
   {
      return res.status(200).json({
         field: errors.array()[0].msg,
         validation: false
      });
   }
   // Create order
   const order = new Order({
      ingredients: req.body.ingredients,
      price: req.body.price,
      customer: req.body.customer,
      userId: req.userId
   });
   order.save()
      .then(result => {
         res.status(200).json({
            message: 'Order successfully created',
            validation: true
         });
      })
      .catch(error => {
         error.statusCode = 500;
         next(error);
      });
}

exports.getIngredients = (req, res, next) => {
   Ingredient.findOne(null, {_id: 0})
      .then(ingredients => {
         res.status(200).json(ingredients);
      })
      .catch(error => {
         error.statusCode = 500;
         next(error);
      });
}

exports.getOrders = (req, res, next) => {
   Order.find({userId: req.userId}, {_id: 1, ingredients: 1, price: 1})
      .then(orders => {
         res.status(200).json(orders);
      })
      .catch(error => {
         error.statusCode = 500;
         next(error);
      });
}

exports.postSignup = (req, res, next) => {
   bcrypt.hash(req.body.password, 12)
      .then(hashedPassword => {
         const user = new User({
            email: req.body.email,
            password: hashedPassword
         });
         return user.save();
      })
      .then(result => {
         res.status(200).json({
            message: 'User succesfully signed up'
         });
      })
      .catch(error => {
         error.statusCode = 500;
         next(error);
      });
}

exports.postLogin = (req, res, next) => {
   let currentUser;
   User.findOne({email: req.body.email})
      .then(user => {
         if (!user) 
         {
            const error = new Error('Email not found');
            error.statusCode = 400;
            throw error;
         }
         currentUser = user;
         return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
         if (!result) 
         {
            const error = new Error('Password do not match');
            error.statusCode = 400;
            throw error;
         }
         // Create token
         const tokenCreated = jwt.sign({
            id: currentUser._id.toString()
         }
         , process.env.WEB_TOKEN_KEY);
         // Sent token in respond
         res.status(200).json({
            token: tokenCreated
         });
      })
      .catch(error => {
         error.statusCode = !error.statusCode ? 500 : error.statusCode;
         next(error);
      });
}

