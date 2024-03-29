var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
  rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
  },
  comment: {
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},  {
  timestamps: true
});
var dishSchema = new Schema({
  name: {
      type: String,
      required: true,
      unique: true
  },
  image: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    unique: true
  },
  label: {
    type: String,
    unique: true,
    default: ""
  },
  price: {
      type: Currency
  },
  description: {
      type: String,
      required: true
  },
  comments:[commentSchema]
},{
    timestamps: true
});

var Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;
