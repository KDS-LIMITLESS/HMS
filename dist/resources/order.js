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
exports.countWaitersOrder = exports.getAllOrder = exports.updateOrder = exports.getOpenOrders = exports.placeOrder = void 0;
const item_1 = require("../models/item");
const order_1 = require("../models/order");
const table_1 = require("../models/table");
function placeOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let time = new Date();
        console.log(req.body.order);
        const ORDER = req.body.order;
        ORDER.forEach((order) => __awaiter(this, void 0, void 0, function* () {
            let item = yield (0, item_1.get_item)(order['item']['product']);
            console.log(order['item']['product']);
            // Delete table in table databases if error occurs here
            // make serial data type count sequentially
            // come back here!!!!!!!
            if (!item) {
                yield (0, table_1.delete_rows)(req.body.table_name);
                console.log(' deleted table');
                return res.status(400).end(`Item does not exist`);
            }
            else {
                yield (0, order_1.new_order)(req.body.activeUser, order['item']['product'], order['item']['price'], order['quantity'], order['item']['category'], order['item']['image'], req.body.table_name, time.toLocaleTimeString());
            }
        }));
        console.log(`new order created!`);
        res.status(200).send('OK');
    });
}
exports.placeOrder = placeOrder;
// get order history within a table
function getOpenOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let order = yield (0, order_1.get_table_orders)(req.body.activeUser, req.body.table_name);
        if (!order)
            return res.status(400).send(`table not found`);
        console.log(req.body);
        let i = [];
        order === null || order === void 0 ? void 0 : order.forEach((item) => {
            let items = {
                "quantity": item.quantity,
                "item": {
                    "product": item.item,
                    "price": item.price,
                    "category": item.category,
                    "image": item.image
                }
            };
            i.push(items);
        });
        console.log(i);
        return res.status(200).send(i);
    });
}
exports.getOpenOrders = getOpenOrders;
// check if table is closed and do not do anything.....
function updateOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let time = new Date();
        console.log(req.body);
        const ORDER = req.body.order;
        let update;
        let newOrder;
        ORDER.forEach((order) => __awaiter(this, void 0, void 0, function* () {
            let item = yield (0, order_1.get_drinks_in_table)(order['item']['product'], req.body.table_name);
            console.log(item.rowCount);
            if (item.rowCount !== 0) {
                update = yield (0, order_1.update_order_quantity)(order['item']['product'], order['quantity'], req.body.table_name);
            }
            else {
                const TOTAL = req.body.price * req.body.quantity;
                // const PRODUCT_PRICE = await get_product_price(order['item']['product'])
                // add total and total amount
                newOrder = yield (0, order_1.new_order)(req.body.activeUser, order['item']['product'], order['item']['price'], order['quantity'], order['item']['category'], order['item']['image'], req.body.table_name, time.toLocaleTimeString());
            }
        }));
        if (update === 0 || newOrder === 0)
            return res.status(400).send(`an error occured`);
        return res.end(`OK`);
    });
}
exports.updateOrder = updateOrder;
function getAllOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ORDERS = yield (0, order_1.get_all_orders)();
            return res.status(200).send(ORDERS.rows);
        }
        catch (err) {
            console.log(err.message);
            return res.status(400).send(`An error occured`);
        }
    });
}
exports.getAllOrder = getAllOrder;
function countWaitersOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let count = yield (0, order_1.count_waiters_order)(req.body.activeUser);
            return res.status(200).json({ Waiter_count: count.rowCount });
        }
        catch (err) {
            console.log(err.message);
            return res.status(400).send(err.message);
        }
    });
}
exports.countWaitersOrder = countWaitersOrder;
// cors should only direct to the frontend
// order status table status
// add automatic total amount check 
// update item prices
// specify items for lounge and bar
// splitting orders into a transaction
// notification
// jwts
// logout 
// printing dockets
// super admin dashboard
//  *********** //
// get all waiters tables
// update drinks in db done
// strong man creates good times, goot times creates weak men, weak men creates bad time
