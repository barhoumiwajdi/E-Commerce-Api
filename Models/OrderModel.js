const mongoose = require('mongoose');
const schema = mongoose.Schema;
const OrderSchema = new schema({
  OrderItems: [{
    Products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produit'
    }],
    Quantity: {
      type: Number
    }
  }],
  TotalPrice: {
    type: Number
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  OrderDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  versionkey: false
})
module.exports = mongoose.model('Order', OrderSchema)