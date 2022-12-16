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
exports.deleteTransaction = exports.getTransactionDates = exports.getAllItemsSentToDepartment = exports.getAllItemsSent = void 0;
const transaction_1 = require("../models/transaction");
const product_1 = require("../../models/product");
const item_1 = require("../models/item");
function getAllItemsSent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let items = yield (0, transaction_1.get_all_sent_items)();
        return res.status(200).send(items.rows);
    });
}
exports.getAllItemsSent = getAllItemsSent;
function getAllItemsSentToDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let items = yield (0, transaction_1.get_all_items_sent_to_department)(req.body.department);
        return res.status(200).send(items.rows);
    });
}
exports.getAllItemsSentToDepartment = getAllItemsSentToDepartment;
function getTransactionDates(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let date = yield (0, transaction_1.get_date)(req.body.from, req.body.to);
        console.log(req.body);
        if (date)
            return res.status(200).json({ filters: date.rows, count: date.rowCount });
        return res.status(400).send("Transactions within the specified date does not exist");
    });
}
exports.getTransactionDates = getTransactionDates;
function deleteTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let transaction = yield (0, transaction_1.get_transaction_by_id)(req.body.id);
        // let transaction = await delete_transaction(req.body.id)
        if (transaction.rowCount === 1) {
            // get the product from database
            let product = yield (0, product_1.get_product_in_department)(req.body.product, req.body.department);
            let item = yield (0, item_1.get_item)(req.body.product);
            // do the subtraction 
            let quantity = product.rows[0]['quantity'] - transaction.rows[0]['quantity'];
            let itemQuantity = item.rows[0]['quantity'] + transaction.rows[0]['quantity'];
            // update the database of the product to take the new figure
            yield (0, product_1.update_item_in_pos)(req.body.product, quantity, req.body.department, req.body.price);
            yield (0, item_1.update_item_quantity)(req.body.product, itemQuantity);
            yield (0, transaction_1.delete_transaction)(req.body.id);
            return res.status(200).send(` Transaction Deleted Successfully!`);
        }
    });
}
exports.deleteTransaction = deleteTransaction;
