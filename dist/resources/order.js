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
            let price = yield (0, item_1.get_product_price)(req.body.item);
            console.log(price);
            if (price) {
                yield (0, order_1.new_order)(req.body.username, req.body.item, price, req.body.quantity, req.body.total_amount, time.toLocaleTimeString());
                return res.status(200).send(` OK `);
            }
            return res.status(400).send(`Item does not exist`);
        }
        catch (err) {
            console.error(err.message);
            return res.status(400).send("Please login to continue");
        }
    });
}
exports.placeOrder = placeOrder;
// notification
// printing dockets
// logout 
// splitting orders into a transaction
// check which user from passcode
