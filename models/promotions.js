var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promoSchema = new Schema({
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
  }
},
  {
    timestamps: true
});

var Promotions = mongoose.model('promotion',promoSchema);

module.exports = Promotions;
