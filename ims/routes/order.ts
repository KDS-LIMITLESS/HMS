import express from 'express'
import { updateOrderStatus, placeOrder, getOrders, getAllOrders, getOrderTransactionByDates } from '../resources/order'


const router = express.Router();

router.get('/order-staus', getOrders)
router.get('/all-orders', getAllOrders)

router.post('/place-order', placeOrder)
router.post('/order-transaction-date', getOrderTransactionByDates )

router.put('/update-status', updateOrderStatus)



module.exports = router;