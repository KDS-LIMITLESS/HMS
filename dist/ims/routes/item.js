"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_1 = require("../resources/item");
const user_1 = require("../../middlewares/user");
const router = express_1.default.Router();
router.post('/send-items', item_1.distributeItems);
router.delete('/delete-item', user_1.authorizeAuditor, item_1.deleteItem);
module.exports = router;
