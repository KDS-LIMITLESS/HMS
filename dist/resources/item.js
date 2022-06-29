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
exports.getItemsInCategory = exports.addNewItem = exports.getItem = void 0;
const queries_1 = require("../models/queries");
function getItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, queries_1.get_all_item)();
        return res.status(200).send(result);
    });
}
exports.getItem = getItem;
function addNewItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqBody = req.body;
        if ((yield (0, queries_1.get_single_item)(reqBody['product'])) !== null)
            return res.status(400)
                .send(`${reqBody['product']} already exists`);
        try {
            let result = yield (0, queries_1.add_item)(reqBody['product'], reqBody['price'], reqBody['category']);
            return res.status(200).send(result.rows);
        }
        catch (err) {
            console.error(err);
            return res.status(400).send(err.message);
        }
    });
}
exports.addNewItem = addNewItem;
function getItemsInCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqBody = req.body;
        const result = yield (0, queries_1.get_all_item_with_category)(reqBody['category']);
        return res.status(200).send(result);
    });
}
exports.getItemsInCategory = getItemsInCategory;
