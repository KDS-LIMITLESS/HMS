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
function placeOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let time = new Date();
        try {
            console.log(req.body.order);
            const ORDER = req.body.order;
            ORDER.forEach((order) => __awaiter(this, void 0, void 0, function* () {
                let item = yield (0, item_1.get_item)(order['item']['product']);
                if (!item)
                    return res.status(400).send(`Item does not exist`);
                console.log(order);
                console.log(order['quantity']);
                yield (0, order_1.new_order)(req.body.activeUser, order['item']['product'], order['item']['price'], order['quantity'], order['item']['category'], order['item']['image'], req.body.total, req.body.table_name, req.body.paymentMethod, time.toLocaleTimeString());
            }));
            console.log(`new order created!`);
            return res.status(200).send(` OK `);
        }
        catch (err) {
            console.error(err.message + " Error from creating new order");
            return res.status(400).send("Please login to continue");
        }
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
