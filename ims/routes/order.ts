import express from 'express'
import { updateOrderStatus, placeOrder, getOrders, getAllOrders } from '../resources/order'


const router = express.Router();

router.get('/get-order-staus', getOrders)
router.get('/get-all-orders', getAllOrders)

router.post('/place-order', placeOrder)

router.put('/update-status', updateOrderStatus)



module.exports = router;