"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const credit_1 = require("../resources/credit");
exports.router = express_1.default.Router();
exports.router.get('/credit-status', credit_1.getcreditStatus);
exports.router.post('/grant-credit', credit_1.grantStaffCredit);
exports.router.post('/user-credit', credit_1.UserCreditStatus);
module.exports = exports.router;
