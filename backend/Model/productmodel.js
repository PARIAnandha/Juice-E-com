const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  images: [
    {
      data: Buffer, // Stores image as binary data
      contentType: String, // MIME type of the image
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
