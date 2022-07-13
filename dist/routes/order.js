"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const order_1 = require("../resources/order");
const user_1 = require("../middlewares/user");
const table_1 = require("../resources/table");
exports.router = express_1.default.Router();
exports.router.get('/all-orders', order_1.getAllOrder);
exports.router.post('/order', user_1.authorizeUser, table_1.createTable, order_1.placeOrder);
exports.router.post('/open-tables', user_1.authorizeUser, order_1.getOpenOrders);
exports.router.post('/update-order', user_1.authorizeUser, order_1.updateOrder);
exports.router.post('/order-count', user_1.authorizeUser, order_1.countWaitersOrder);
module.exports = exports.router;
