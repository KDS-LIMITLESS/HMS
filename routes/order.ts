import express from 'express'
import { placeOrder, getOpenOrders, updateOrder, getAllOrder, 
    countWaitersOrder } from '../resources/order'
import { authorizeUser } from '../middlewares/user';
import { createTable } from '../resources/table';

export const router = express.Router();


router.get('/all-orders', getAllOrder);
router.post('/order', authorizeUser, createTable, placeOrder);
router.post('/open-tables', authorizeUser, getOpenOrders);
router.post('/update-order', authorizeUser, updateOrder);
router.post('/order-count', countWaitersOrder)

module.exports = router;