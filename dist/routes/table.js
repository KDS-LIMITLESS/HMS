"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const table_1 = require("../resources/table");
exports.router = (0, express_1.Router)();
exports.router.get('/tables', table_1.getTable);
module.exports = exports.router;
