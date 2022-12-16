"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCancelledOrderTotal = exports.calculatePlacedOrders = exports.countCancelledOrders = exports.countReceivedOrders = exports.updateReceivedOrderQuantity = exports.getReceivedOrders = exports.getCancelledOrders = exports.getOrderTransactionByDates = exports.getAllOrders = exports.getOrders = exports.updateOrderStatus = exports.placeOrder = void 0;
const order_1 = require("../models/order");
function placeOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const order = yield (0, order_1.place_order)(req.body.product, req.body.qty, req.body.qty, req.body.size, req.body.metric, req.body.unitPrice);
        if (order.rowCount >= 1)
            return res.status(200).send(`OK`);
        return res.status(400).send(` An error happened! `);
    });
}
exports.placeOrder = placeOrder;
function updateOrderStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const status = yield (0, order_1.update_order_status)(req.body.product, req.body.status);
        if (status.rowCount >= 1)
            return res.status(200).send(`OK`);
        return res.status(400).send(`Error`);
    });
}
exports.updateOrderStatus = updateOrderStatus;
// export async function updateOrderStatustest(req:Request, res:Response) {
//     const  reqBody = req.body
//     const status = await update_order_status(req.body.item, req.body.status)
//     if (status.rowCount >= 1){
//         if (req.body.status === 'RECEIVED') {
//             const item = await get_item(req.body.item)
//             if(item.rowCount >= 1) {
//                 await update_item_quantity(req.body.product, req.body.quantity)  // function in pos models/item
//                 return res.status(200).send(`item quantity updated`)
//             } 
//             await add_item(reqBody['product'], reqBody['quantity'], 
//             reqBody['image'], reqBody['size'], reqBody['metric'], reqBody['reorder'])
//             return res.status(200).send(` item added successfully`)
//         }
//         return res.status(200).send(`OK`)
//     } 
//     return res.status(400).send(`Error`)
// }
function getOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const orders = yield (0, order_1.get_order_by_status)(req.body.status);
        if (orders.rowCount > 0)
            return res.status(200).json({ filters: orders.rows, count: orders.rowCount });
        return res.status(400).send(`None`);
    });
}
exports.getOrders = getOrders;
function getAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const orders = yield (0, order_1.get_all_order)();
        if (orders.rowCount > 0)
            return res.status(200).send(orders.rows);
        return res.status(400).send(`No Orders`);
    });
}
exports.getAllOrders = getAllOrders;
function getOrderTransactionByDates(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let date = yield (0, order_1.get_orders_by_date)(req.body.from, req.body.to);
        if (date)
            return res.status(200).json({ filters: date.rows, count: date.rowCount });
        return res.status(400).send("Transactions within the specified date does not exist");
    });
}
exports.getOrderTransactionByDates = getOrderTransactionByDates;
function getCancelledOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let orders = yield (0, order_1.get_cancelled_orders)();
        if (orders)
            return res.status(200).json({ filters: orders.rows, count: orders.rowCount });
    });
}
exports.getCancelledOrders = getCancelledOrders;
function getReceivedOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let orders = yield (0, order_1.get_received_orders)();
        if (orders)
            return res.status(200).json({ filters: orders.rows, count: orders.rowCount });
    });
}
exports.getReceivedOrders = getReceivedOrders;
function updateReceivedOrderQuantity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let item = yield (0, order_1.get_one_order)(req.body.item);
        if (item.rowCount >= 1) {
            let orders = yield (0, order_1.update_received_order_quantity)(req.body.qty, req.body.item);
            return res.status(200).send(orders.rows[0]);
        }
    });
}
exports.updateReceivedOrderQuantity = updateReceivedOrderQuantity;
function countReceivedOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let count = yield (0, order_1.count_received_order)();
        return res.status(200).send(count.rows[0]);
    });
}
exports.countReceivedOrders = countReceivedOrders;
function countCancelledOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let count = yield (0, order_1.count_cancelled_order)();
        return res.status(200).send(count.rows[0]);
    });
}
exports.countCancelledOrders = countCancelledOrders;
function calculatePlacedOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let total = yield (0, order_1.calculate_placed_orders)();
        return res.status(200).send(total.rows[0]);
    });
}
exports.calculatePlacedOrders = calculatePlacedOrders;
function calculateCancelledOrderTotal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let total = yield (0, order_1.calculate_cancelled_orders)();
        return res.status(200).send(total.rows[0]);
    });
}
exports.calculateCancelledOrderTotal = calculateCancelledOrderTotal;
