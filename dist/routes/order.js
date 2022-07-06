"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const order_1 = require("../resources/order");
const user_1 = require("../middlewares/user");
exports.router = express_1.default.Router();
exports.router.post('/order', user_1.authorizeUser, order_1.placeOrder);
module.exports = exports.router;
