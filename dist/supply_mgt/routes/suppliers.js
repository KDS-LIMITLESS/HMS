"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const suppliers_1 = require("../resources/suppliers");
exports.router = express_1.default.Router();
exports.router.post('/new-supplier', suppliers_1.newSupplier);
module.exports = exports.router;
