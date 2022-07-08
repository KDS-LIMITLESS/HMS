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
exports.getOpenOrders = exports.placeOrder = void 0;
const order_1 = require("../models/order");
const item_1 = require("../models/item");
const order_2 = require("../models/order");
function placeOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let time = new Date();
        console.log(req.body.order);
        const ORDER = req.body.order;
        ORDER.forEach((order) => __awaiter(this, void 0, void 0, function* () {
            let item = yield (0, item_1.get_item)(order['item']['product']);
            // Delete table in table databases if error occurs here
            // make serial data type count sequentially
            if (!item)
                return res.status(400).end(`Item does not exist`);
            yield (0, order_1.new_order)(req.body.activeUser, order['item']['product'], order['item']['price'], order['quantity'], order['item']['category'], order['item']['image'], req.body.total, req.body.table_name, req.body.paymentMethod, time.toLocaleTimeString());
        }));
        console.log(`new order created!`);
        res.status(200).send('OK');
    });
}
exports.placeOrder = placeOrder;
function getOpenOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, order_2.get_table_orders)(req.body.activeUser)
            .then((result) => {
            result === null || result === void 0 ? void 0 : result.forEach(x => {
                let order = { quantity: result };
            });
            console.log(``);
            return res.status(200).send(result);
        })
            .catch(err => {
            console.error(err.message);
            return res.status(400).send(err);
        });
    });
}
exports.getOpenOrders = getOpenOrders;
// order status
// update item prices
// notification
// jwts
// logout 
// printing dockets
// super admin dashboard
//  *********** //
// get all waiters tables
// splitting orders into a transaction
// strong man creates good times, goot times creates weak men, weak men creates bad time
