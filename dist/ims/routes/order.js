"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../resources/order");
const router = express_1.default.Router();
router.get('/cancelled-order', order_1.countCancelledOrders);
router.get('/received-order', order_1.countReceivedOrders);
router.get('/calculate-placed-order', order_1.calculatePlacedOrders);
router.get('/calculate-cancelled-order', order_1.calculateCancelledOrderTotal);
router.get('/all-orders', order_1.getAllOrders);
router.get('/received-orders', order_1.getReceivedOrders);
router.get('/cancelled-orders', order_1.getCancelledOrders);
router.post('/order-staus', order_1.getOrders);
router.post('/place-order', order_1.placeOrder);
router.post('/order-transaction-date', order_1.getOrderTransactionByDates);
router.put('/update-status', order_1.updateOrderStatus);
router.put('/update-order-quantity', order_1.updateReceivedOrderQuantity);
module.exports = router;
// api for getting cancelled orders
// api for getting received orders
// api for update received order quantity
// api for adding new products 
// api for home screen
