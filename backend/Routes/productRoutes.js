const express = require('express');
const multer = require('multer');
const productController = require('../Controllers/productController'); // Adjust path as needed

const router = express.Router();

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new product with multiple images
router.post('/products', upload.array('images', 10), productController.createProduct);

// Retrieve all products
router.get('/products', productController.getAllProducts);

// Retrieve a single product by ID
router.get('/products/:id', productController.getProductById);

// Update a product's details
router.put('/products/:id', productController.updateProduct);

// Delete a product
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
