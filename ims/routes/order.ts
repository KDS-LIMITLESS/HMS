import express from 'express'
import { updateOrderStatus, placeOrder, getOrders, getAllOrders } from '../resources/order'


const router = express.Router();

router.get('/get-orders', getOrders)
router.get('/all-orders', getAllOrders)

router.post('/place-order', placeOrder)

router.put('/update-status', updateOrderStatus)



module.exports = router;