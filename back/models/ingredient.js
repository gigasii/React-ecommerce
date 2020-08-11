const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
   cheese: {
      type: Number,
      required: true
   },
   salad: {
      type: Number,
      required: true
   },
   bacon: {
      type: Number,
      required: true
   },
   meat: {
      type: Number,
      required: true
   }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);