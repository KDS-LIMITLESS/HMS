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
exports.deleteItem = exports.distributeItems = void 0;
const item_1 = require("../models/item");
const product_1 = require("../../models/product");
const order_1 = require("../../models/order");
const transaction_1 = require("../models/transaction");
function distributeItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield (0, item_1.get_item)(req.body.product);
        let qty;
        if (item.rowCount < 1) {
            return res.status(400).send('Item not found!');
        }
        if (item.rows[0]['quantity'] === 0 || item.rows[0]['quantity'] < req.body.quantity) {
            return res.status(400).send(`item quantity too low in store`);
        }
        let image = yield (0, item_1.get_product_image)(req.body.product);
        // find product in department 
        let product = yield (0, product_1.get_product_in_department)(req.body.product, req.body.department);
        // if found update product, price and quantity
        if (product.rowCount >= 1) {
            //add/update product quantity
            let product_quantity = product.rows[0]['quantity'] + req.body.quantity;
            yield (0, product_1.update_item_in_pos)(req.body.product, product_quantity, req.body.department, req.body.price);
            yield (0, transaction_1.record_transactions)(req.body.product, req.body.department, req.body.quantity, req.body.description, req.body.portion, req.body.size, req.body.price);
            qty = item.rows[0]['quantity'] - req.body.quantity;
            yield (0, item_1.reduce_item_quantity)(req.body.product, qty);
            return res.status(200).send(`OK`);
        }
        else {
            yield (0, product_1.send_item_to_pos_department)(req.body.product, req.body.department, req.body.quantity, image, req.body.category, req.body.price);
            yield (0, transaction_1.record_transactions)(req.body.product, req.body.department, req.body.quantity, req.body.description, req.body.portion, req.body.size, req.body.price);
            let qty = item.rows[0]['quantity'] - req.body.quantity;
            yield (0, item_1.reduce_item_quantity)(req.body.product, qty);
            return res.status(200).send(`${req.body.quantity} ${req.body.product} sent to ${req.body.department}`);
        }
    });
}
exports.distributeItems = distributeItems;
// ims function
function deleteItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let item = yield (0, order_1.get_item_in_orders)(req.body.product);
            if (item.rowCount >= 1) {
                // update the item status in items
                yield (0, item_1.update_item_status)(req.body.product);
                // return a response of status set to delete
                return res.status(200).send("Item status updated");
            }
            const ITEM = yield (0, item_1.get_item)(req.body.product);
            if (ITEM.rowCount === 1) {
                yield (0, item_1.delete_item)(req.body.product);
                return res.status(200).json({ message: "Item deleted from database", action: 'DELETE' });
            }
            return res.status(400).send(`Error. Item does not exist.`);
        }
        catch (err) {
            return res.status(400).send(err.message);
        }
    });
}
exports.deleteItem = deleteItem;
