"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const table_1 = require("../resources/table");
const user_1 = require("../middlewares/user");
exports.router = (0, express_1.Router)();
exports.router.post('/tables', table_1.getWaiterTables); // rename to my-tables
exports.router.put('/close-table', user_1.authorizeDiscount, table_1.closeTable);
// admin table to see all tables 
exports.router.post('/all-tables', user_1.authorizeAuditor, table_1.getAllTables);
exports.router.post('/table', table_1.getTableDiscount);
module.exports = exports.router;
