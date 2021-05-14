const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date().getTime(),
  },
  id: {
    type: String,
    required : true 
  }
});

module.exports = new mongoose.model("item", itemSchema);
