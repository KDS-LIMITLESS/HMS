import express from 'express'
import { updateOrderStatus, placeOrder, getOrders, getAllOrders, 
    getOrderTransactionByDates, getReceivedOrders, getCancelledOrders,
    countCancelledOrders, countReceivedOrders, updateReceivedOrderQuantity,
    calculatePlacedOrders, calculateCancelledOrderTotal } from '../resources/order'


const router = express.Router();

router.get('/cancelled-order', countCancelledOrders)
router.get('/received-order', countReceivedOrders)
router.get('/calculate-placed-order', calculatePlacedOrders)
router.get('/calculate-cancelled-order', calculateCancelledOrderTotal)
router.get('/all-orders', getAllOrders)
router.get('/received-orders', getReceivedOrders);
router.get('/cancelled-orders', getCancelledOrders)

router.post('/order-staus', getOrders)
router.post('/place-order', placeOrder)
router.post('/order-transaction-date', getOrderTransactionByDates )

router.put('/update-status', updateOrderStatus)
router.put('/update-order-quantity', updateReceivedOrderQuantity)



module.exports = router;

// api for getting cancelled orders
// api for getting received orders
// api for update received order quantity
// api for adding new products 
// api for home screen