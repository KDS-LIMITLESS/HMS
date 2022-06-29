"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const item_1 = require("../resources/item");
exports.router = express_1.default.Router();
exports.router.get('/items', item_1.getItem);
exports.router.post('/new-item', item_1.addNewItem);
//router.get('/items/category', getItemsInCategory)
//
module.exports = exports.router;
