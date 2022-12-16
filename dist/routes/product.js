"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const product_1 = require("../resources/product");
const user_1 = require("../middlewares/user");
const imageloader_1 = require("../middlewares/imageloader");
exports.router = express_1.default.Router();
exports.router.get('/items', product_1.getItem);
exports.router.post('/items/department', product_1.getAllDrinksDepartment);
exports.router.post('/items/category', product_1.getItemsInCategory);
exports.router.post('/new-item', user_1.authorizeStoreManager, product_1.addNewItem); // add item
exports.router.post('/upload', imageloader_1.uploadPicture);
exports.router.post('/dates-filter', product_1.filterItemsByDates);
exports.router.put('/update-item', user_1.authorizeSuperAdminNext, product_1.updateItem);
exports.router.put('/update-quantity', user_1.authorizeStoreManager, product_1.updateItemQuantity);
exports.router.put('/update-reorder-level', user_1.authorizeStoreManager, product_1.updateItemReorderLevel);
exports.router.delete('/delete-item', user_1.authorizeStoreManager, product_1.deleteItem);
module.exports = exports.router;
