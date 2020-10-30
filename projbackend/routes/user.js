const express = require('express');
const router = express.Router();

const { getUserById, getUser, getAllUsers, updateUser, userPurchaseList } = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

//params
router.param("userId",getUserById);

//routes
router.get(
    '/user/:userId', 
    isSignedIn, 
    isAuthenticated, 
    getUser
);

router.get(
    '/users',
    isSignedIn, 
    isAuthenticated, 
    isAdmin, 
    getAllUsers
);

router.put(
    '/user/:userId', 
    isSignedIn, 
    isAuthenticated, 
    updateUser
);

router.get(
    '/orders/user/:userId', 
    isSignedIn, 
    isAuthenticated, 
    userPurchaseList
);

module.exports = router;
 