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
exports.deleteOrder = exports.removeOrdersFromTable = exports.countWaitersOrder = exports.getAllOrder = exports.updateOrder = exports.getTableOrders = exports.placeOrder = void 0;
const order_1 = require("../models/order");
const notifiacation_1 = require("../models/notifiacation");
const product_1 = require("../models/product");
const user_1 = require("../models/user");
function placeOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let time = new Date();
        const ORDER = req.body.order;
        for (const order of ORDER) {
            console.log(order);
            yield (0, order_1.new_order)(req.body.activeUser, order['product'], order['price'], order['quantity'], order['category'], order['image'], order['department'], req.body.table_name, time.toLocaleTimeString());
            let quantity = yield (0, product_1.get_product_in_department)(order['product'], order['department']);
            let new_quantity = quantity.rows[0]['quantity'] - order['quantity'];
            console.log(new_quantity);
            yield (0, order_1.decrease_item_quantity_in_pos)(order['product'], new_quantity, order['department']);
            yield (0, notifiacation_1.send_notification)(req.body.activeUser, order['product'], order['quantity']);
        }
        ;
        console.log(`new order created!`);
        res.status(200).send('OK');
    });
}
exports.placeOrder = placeOrder;
// get order history within a table
function getTableOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let TABLE_ORDERS;
        if (req.body.role === 'Super Admin' || req.body.role === 'Administrator' || req.body.role === 'Accounts'
            || req.body.role === 'Supervisor') {
            TABLE_ORDERS = yield (0, order_1.get_table_orders_for_admin)(req.body.table_name);
        }
        else {
            TABLE_ORDERS = yield (0, order_1.get_table_orders)(req.body.activeUser, req.body.table_name);
        }
        console.log(req.body);
        if (!TABLE_ORDERS)
            return res.status(400).send(`table not found`);
        // converting return type from db to [{}] required by the client.
        let notification = [];
        let returned = 0;
        TABLE_ORDERS === null || TABLE_ORDERS === void 0 ? void 0 : TABLE_ORDERS.forEach((item) => {
            let items = {
                // "username": item.username,
                "quantity": item.quantity,
                "returned": returned,
                "item": {
                    "product": item.item,
                    "price": item.price,
                    "category": item.category,
                    "image": item.image,
                    "department": item.department
                }
            };
            notification.push(items);
        });
        return res.status(200).send(notification);
    });
}
exports.getTableOrders = getTableOrders;
// check if table is closed and do not do anything.....
function updateOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let time = new Date();
        const ORDER = req.body.order;
        // check if table exists
        for (const order of ORDER) {
            let item = yield (0, order_1.get_drinks_in_table)(order['product'], req.body.table_name);
            console.log(req.body);
            if (item.rowCount !== 0) {
                let quantity = order['quantity'] + item.rows[0]['quantity'];
                yield (0, order_1.update_order_quantity)(order['product'], quantity, req.body.table_name);
                // order derails to send to the bar man as notification
                let quantity1 = yield (0, product_1.get_product_in_department)(order['product'], order['department']);
                let new_quantity = quantity1.rows[0]['quantity'] - order['quantity'];
                console.log(new_quantity);
                yield (0, order_1.decrease_item_quantity_in_pos)(order['product'], new_quantity, order['department']);
                yield (0, notifiacation_1.send_notification)(req.body.activeUser, order['product'], order['quantity']);
            }
            else {
                // item exists 
                // const TOTAL =  req.body.price*req.body.quantity
                yield (0, order_1.new_order)(req.body.activeUser, order['product'], order['price'], order['quantity'], order['category'], order['image'], order['department'], req.body.table_name, time.toLocaleTimeString());
                let quantity = yield (0, product_1.get_product_in_department)(order['product'], order['department']);
                let new_quantity = quantity.rows[0]['quantity'] - order['quantity'];
                console.log(new_quantity);
                yield (0, order_1.decrease_item_quantity_in_pos)(order['product'], new_quantity, order['department']);
                yield (0, notifiacation_1.send_notification)(req.body.activeUser, order['product'], order['quantity']);
            }
        }
        ;
        return res.json(`OK`);
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
            let user = yield (0, user_1.get_user)(req.body.activeUser);
            if (user.rows[0]['role'] === 'Super Admin' || user.rows[0]['role'] === 'Administrator'
                || user.rows[0]['role'] === 'Accounts') {
                let count = yield (0, order_1.count_all_orders)();
                return res.status(200).json({ order_count: count.rowCount });
            }
            let count = yield (0, order_1.count_waiters_order)(req.body.activeUser);
            return res.status(200).json({ order_count: count.rowCount });
        }
        catch (err) {
            console.log(err.message);
            return res.status(400).send(err.message);
        }
    });
}
exports.countWaitersOrder = countWaitersOrder;
function removeOrdersFromTable(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ORDER = req.body.order;
        let order;
        let quantity;
        let new_quantity;
        console.log(JSON.stringify(req.body));
        for (order of ORDER) {
            let item = yield (0, order_1.get_drinks_in_table)(order['item']['product'], req.body.table_name);
            if (item.rowCount !== 0 && order['returned'] > 0) {
                console.log(JSON.stringify((order['item']['product'], order['returned'])));
                yield (0, order_1.update_order_quantity)(order['item']['product'], order['quantity'], req.body.table_name);
                quantity = yield (0, product_1.get_product_in_department)(order['item']['product'], order['item']['department']);
                new_quantity = quantity.rows[0]['quantity'] + order['returned'];
                yield (0, order_1.decrease_item_quantity_in_pos)(order['item']['product'], new_quantity, order['item']['department']);
            }
        }
        return res.status(200).send(`OK`);
    });
}
exports.removeOrdersFromTable = removeOrdersFromTable;
function deleteOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let quantity;
        let new_quantity;
        let order = yield (0, order_1.get_order)(req.body.table_name, req.body.product);
        if (order.rowCount === 1) {
            yield (0, order_1.delete_order)(req.body.table_name, req.body.product);
            quantity = yield (0, product_1.get_product_in_department)(req.body.product, order.rows[0]['department']);
            new_quantity = quantity.rows[0]['quantity'] + order.rows[0]['quantity'];
            yield (0, order_1.decrease_item_quantity_in_pos)(req.body.product, new_quantity, order.rows[0]['department']);
            return res.status(200).send(`OK`);
        }
        return res.status(400).send(`ERROR!`);
    });
}
exports.deleteOrder = deleteOrder;
// async function reduceQuantity() {
//     let order:any ;
//     let quantity = await get_product_in_department(order['item']['product'], order['department'])
//     let new_quantity = quantity.rows[0]['quantity'] - order['item']['quantity']
//     return new_quantity
// }
