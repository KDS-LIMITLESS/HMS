"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const item_1 = require("../resources/item");
const user_1 = require("../middlewares/user");
const imageloader_1 = require("../middlewares/imageloader");
exports.router = express_1.default.Router();
exports.router.get('/items', item_1.getItem);
exports.router.post('/items/department', item_1.getAllDrinksDepartment);
exports.router.post('/items/category', item_1.getItemsInCategory);
exports.router.post('/new-item', user_1.authorizeStoreManager, item_1.addNewItem); // add item
exports.router.post('/upload', imageloader_1.uploadPicture);
exports.router.post('/dates-filter', item_1.filterItemsByDates);
exports.router.put('/update-item', user_1.authorizeSuperAdminNext, item_1.updateItem);
exports.router.put('/update-quantity', user_1.authorizeStoreManager, item_1.updateItemQuantity);
exports.router.put('/update-reorder-level', user_1.authorizeStoreManager, item_1.updateItemReorderLevel);
exports.router.delete('/delete-item', user_1.authorizeStoreManager, item_1.deleteItem);
module.exports = exports.router;
