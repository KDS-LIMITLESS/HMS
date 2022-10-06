import express from 'express'
import { updateOrderStatus, placeOrder, getOrders, getAllOrders, 
    getOrderTransactionByDates, getReceivedOrders, getCancelledOrders } from '../resources/order'


const router = express.Router();

router.post('/order-staus', getOrders)
router.get('/all-orders', getAllOrders)

router.get('/received-orders', getReceivedOrders);
router.get('/cancelled-orders', getCancelledOrders)

router.post('/place-order', placeOrder)
router.post('/order-transaction-date', getOrderTransactionByDates )

router.put('/update-status', updateOrderStatus)



module.exports = router;

// api for getting cancelled orders
// api for getting received orders
// api for update received order quantity
// api for adding new products 
// api for home screen