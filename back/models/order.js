const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   ingredients: {
      type: Object,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   customer: {
      name: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: true
      },
      street: {
         type: String,
         required: true
      },
      zipCode: {
         type: String,
         required: true
      },
      deliveryMethod: {
         type: String,
         required: true
      }
   }
});

module.exports = mongoose.model('Order', orderSchema);