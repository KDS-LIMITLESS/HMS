import express from 'express'
import { updateOrderStatus, placeOrder, getOrders } from '../resources/order'


const router = express.Router();

router.get('/get-orders', getOrders)

router.post('/place-order', placeOrder)

router.put('/update-status', updateOrderStatus)



module.exports = router;