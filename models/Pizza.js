//import dependencies from mongoose
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      default: 'Large'
    },
    //[] meaning empty array; alternatively use 'Array'
    toppings: [],
    //ref tell the Pizza model which documents to search to find the right comments
    comments:[
      {
        //The ref property tells Mongoose to expect an ObjectId and to tell it that its data comes from the Comment model.
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  //tell the schema that it can use virtuals, by adding the toJSON property to the schema options.
  //id set to false b/c this is a virtual that Mongoose returns, and we don’t need it.
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false    
  }
  );

  // get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

  // create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;