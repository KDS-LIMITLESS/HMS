import express from 'express'
import { placeOrder, getTableOrders, updateOrder, getAllOrder, 
    countWaitersOrder, removeOrdersFromTable } from '../resources/order'
import { authorizeUser, authorizeAuditor } from '../middlewares/user';
import { createTable } from '../resources/table';

export const router = express.Router();


router.get('/all-orders', getAllOrder);
router.post('/order', authorizeUser, createTable, placeOrder);
router.post('/table-orders', authorizeUser, getTableOrders);
router.post('/update-order', authorizeUser, updateOrder);
router.post('/order-count', authorizeUser, countWaitersOrder)
router.post('/return-order', authorizeAuditor, removeOrdersFromTable)

module.exports = router;