const express = require('express');
const route  = express.Router();

//controllers
const { createProduct, getProductById, photo, getProduct, updateProduct, removeProduct, getAllProducts, getAllUniqueCategories } = require('../controllers/product');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const router = require('./user');

//params
router.param('userId', getUserById);
router.param('productId', getProductById);

//actual routes
//create
router.post(
    '/product/create/:userId',
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    createProduct
);

//read
router.get('/product/:productId', getProduct);
router.get('/produt/photo/:productId', photo);

//update
router.put(
    '/product/:productId/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
);

//delete
router.delete(
    '/product/:productId/:userId',
    isSignedIn,
    isAuthenticated,
    isAdmin,
    removeProduct
);

//listing routes
router.get('/products', getAllProducts);

router.get('/products/categories', getAllUniqueCategories);

module.exports = require;