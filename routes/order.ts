import express from 'express'
import { placeOrder } from '../resources/order'

export const router = express.Router();

router.post('/order', placeOrder)

module.exports = router;