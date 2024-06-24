const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  Product_name: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    enum: ['clothing', 'books', 'electronics', 'home', 'others'],
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Image: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\.(jpg|jpeg|png)$/i.test(v);
      },
      message: props => `${props.value} is not a valid image format! Only JPG, JPEG, and PNG are allowed.`
    }
  },
  Hostel: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'PG', 'Q'],
    required: true,
  },
});

// Define the model or the collection name
export const User=new mongoose.model("User", userSchema);
