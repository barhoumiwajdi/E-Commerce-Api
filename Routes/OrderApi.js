const express = require('express');
const passport = require('passport');
const authRole = require('../Passport/VerifyUser')
const { addOrder, OrderList, OrderById, updateOrder, deleteOrder } = require('../Controllers/OrderController');

const router = express.Router();
router.post('/order', passport.authenticate('bearer', { session: false }), authRole("admin", "client"), addOrder);
router.get('/order', passport.authenticate('bearer', { session: false }), authRole("admin", "client"), OrderList);
router.get('/order/:id', passport.authenticate('bearer', { session: false }), authRole("admin", "client"), OrderById)
router.put('/order/:id', passport.authenticate('bearer', { session: false }), authRole("admin", "client"), updateOrder)
router.delete('/order/:id', passport.authenticate('bearer', { session: false }), authRole("admin", "client"), deleteOrder)

module.exports = router