"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const user_1 = require("../resources/user");
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
exports.router.post('/new-user', user_1.newUser);
exports.router.post('/login', user_1.login);
module.exports = exports.router;
