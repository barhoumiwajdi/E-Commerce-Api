const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ProductSchema = new schema({
  Name: {
    type: String,
    required: true
  },
  Disponiblity: {
    type: String,
    Enumerator: ['en stock', 'rupture de stock'],
    default: "en stock",
  },
  Reference: {
    type: String,
    required: true
  },
  Brand: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true
  },
  Image: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  },
  Price: {
    type: Number,
    required: true
  }
}
  , {
    timestamps: true,
    versionkey: false
  })
module.exports = mongoose.model('Product', ProductSchema)