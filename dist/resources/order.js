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
exports.placeOrder = void 0;
const order_1 = require("../models/order");
const item_1 = require("../models/item");
function placeOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let time = new Date();
        try {
            const ORDER = req.body.order;
            ORDER.forEach((order) => __awaiter(this, void 0, void 0, function* () {
                let item = yield (0, item_1.get_item)(order['item']['product']);
                if (!item)
                    return res.status(400).send(`Item does not exist`);
                // let productPrice = get_product_price()
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
// get all waiters tables
// update item prices
//jwts
// notification
// printing dockets
// logout 
// splitting orders into a transaction
// printing dockets
// make table Database ---> tableName, 
// order table will now have a tablename which is unique
