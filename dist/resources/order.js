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
const item_1 = require("../models/item");
const table_1 = require("../models/table");
function placeOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let time = new Date();
        const ORDER = req.body.order;
        ORDER.forEach(o => {
            console.log(o);
            console.log(o['item']);
        });
        console.log(`after order`);
        try {
            let price = yield (0, item_1.get_product_price)(req.body.item);
            let table = yield (0, table_1.get_table)(req.body.table_name);
            console.log(price);
            console.log(price + '' + table + " Table and price");
            if (price && table) {
                console.log(`price and table exists!`);
                //await new_order(req.body.activeUser, req.body.item, price, 
                //    req.body.quantity, req.body.total_amount, table, time.toLocaleTimeString()
                //)
                console.log(`new order created!`);
                return res.status(200).send(` OK `);
            }
            return res.status(400).send(`An error occured`);
        }
        catch (err) {
            console.error(err.message + " Error from creating new order");
            return res.status(400).send("Please login to continue");
        }
    });
}
exports.placeOrder = placeOrder;
// get all waiters tables
//jwts
// notification
// printing dockets
// logout 
// splitting orders into a transaction
// printing dockets
// make table Database ---> tableName, 
// order table will now have a tablename which is unique
