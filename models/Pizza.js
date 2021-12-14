//import dependencies from mongoose
const { Schema, model } = require('mongoose');

//create schema
const PizzaSchema = new Schema({
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      //if no value is provided, use default
      default: Date.now
    },
    size: {
      type: String,
      default: 'Large'
    },
    //[] meaning empty array; alternatively use 'Array'
    toppings: []
  });

  // create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;