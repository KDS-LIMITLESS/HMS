import express from 'express'
import { placeOrder } from '../resources/order'
import { authorizeUser } from '../middlewares/user';

export const router = express.Router();

router.post('/order', authorizeUser, placeOrder)

module.exports = router;