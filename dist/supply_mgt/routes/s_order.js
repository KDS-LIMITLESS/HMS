"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const s_order_1 = require("../resources/s_order");
const router = express_1.default.Router();
router.post("/place-order", s_order_1.placeSupplyOrder);
router.post('/placed-orders', s_order_1.getAllPlacedOrders);
router.post('/received-orders', s_order_1.getAllReceivedOrders);
router.post('/get-total', s_order_1.getTotalPlacedOrders);
router.put("/receive-supply-order", s_order_1.receiveSupplyOrder);
router.put("/cancel-supply-order", s_order_1.cancelSupplyOrder);
module.exports = router;
