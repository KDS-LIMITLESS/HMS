import express from 'express'
import { placeOrder, getOpenOrders } from '../resources/order'
import { authorizeUser } from '../middlewares/user';
import { createTable } from '../resources/table';

export const router = express.Router();

router.post('/order', authorizeUser, createTable, placeOrder)
router.post('/open-tables', authorizeUser, getOpenOrders)

module.exports = router;