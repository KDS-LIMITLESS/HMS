"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeTable = exports.getTable = exports.createTable = void 0;
const table_1 = require("../models/table");
const table_2 = require("../models/table");
function createTable(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let table = yield (0, table_1.get_table)(req.body.table);
            if (table !== null)
                return res.status(400).send(`Table in use`);
            yield (0, table_1.create_new_table)(req.body.table_name, req.body.activeUser);
            console.log(`Created table ${req.body.table_name}`);
            next();
        }
        catch (err) {
            console.log(` table in use`);
            return res.status(400).send(`table already exists`);
        }
    });
}
exports.createTable = createTable;
function getTable(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield (0, table_1.get_all_waiter_tables)(req.body.activeUser);
            if (result)
                return res.status(200).send(result);
            return res.status(400).send(`None`);
        }
        catch (err) {
            console.log(err.message);
        }
    });
}
exports.getTable = getTable;
function closeTable(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let time = new Date();
        let getTable = yield (0, table_1.get_one_waiter_table)(req.body.table_name, req.body.activeUser);
        const TABLE_CLOSED = yield (0, table_2.get_closed_tables)(req.body.table_name);
        if (getTable.rowCount === 0 || TABLE_CLOSED.rowCount === 1) {
            return res.status(400).send(`table not found or table already closed`);
        }
        // check if this table has orders in the order table before closing!
        console.log(`here!!`);
        const CLOSE_TABLE = yield (0, table_2.close_order_table)(req.body.activeUser, req.body.table_name, req.body.payment_method, req.body.total, time.toLocaleTimeString());
        console.log(CLOSE_TABLE.rowCount);
        return res.status(200).json({ table_status: "CLOSED" });
    });
}
exports.closeTable = closeTable;
