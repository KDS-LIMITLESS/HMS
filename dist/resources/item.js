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
exports.updateItem = exports.deleteItem = exports.getAllDrinksDepartment = exports.getItemsInCategory = exports.addNewItem = exports.getItem = void 0;
const item_1 = require("../models/item");
function getItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, item_1.get_all_items)();
            return res.status(200).send(result.rows);
        }
        catch (err) {
            console.error(err);
            return res.status(400).send("An Error Occured ");
        }
    });
}
exports.getItem = getItem;
function addNewItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqBody = req.body;
        try {
            if ((yield (0, item_1.get_item)(reqBody['product'], reqBody['department'])) !== null)
                return res.status(400)
                    .send(`${reqBody['product']} already exists`);
            yield (0, item_1.add_item)(reqBody['product'], reqBody['price'], reqBody['category'], reqBody['image'], reqBody['department']);
            return res.status(200).send('OK');
        }
        catch (err) {
            console.log(err.message);
            return res.status(400).send(err.message);
        }
    });
}
exports.addNewItem = addNewItem;
function getItemsInCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqBody = req.body;
        const result = yield (0, item_1.get_all_items_with_category)(reqBody['category']);
        return res.status(200).send(result.rows);
    });
}
exports.getItemsInCategory = getItemsInCategory;
function getAllDrinksDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, item_1.get_drinks_in_department)(req.body.department);
            return res.status(200).send(result.rows);
        }
        catch (err) {
            console.error(err);
            return res.status(400).send("An Error Occured ");
        }
    });
}
exports.getAllDrinksDepartment = getAllDrinksDepartment;
function deleteItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ITEM = yield (0, item_1.get_item)(req.body.product, req.body.department);
            console.log(ITEM);
            if (ITEM.rowCount === 1) {
                yield (0, item_1.delete_item)(req.body.product, req.body.department);
                return res.status(200).send("OK");
            }
            return res.status(400).send(`Error. Item does not exist.`);
        }
        catch (err) {
            return res.status(400).send(err.message);
        }
    });
}
exports.deleteItem = deleteItem;
function updateItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ITEM = yield (0, item_1.get_item)(req.body.product, req.body.department);
            if (ITEM.rowCount === 1) {
                yield (0, item_1.update_item)(req.body.product, req.body.price);
                return res.status(200).send(`ITEM UPDATED`);
            }
            return res.status(404).send(`Item not found in department!`);
        }
        catch (err) {
            return res.status(400).send(err.message);
        }
    });
}
exports.updateItem = updateItem;
