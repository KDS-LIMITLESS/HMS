import express from 'express'
import { placeOrder } from '../resources/order'
import { authorizeUser } from '../middlewares/user';
import { createTable } from '../resources/table';

export const router = express.Router();

router.post('/order', authorizeUser, createTable, placeOrder)

module.exports = router;