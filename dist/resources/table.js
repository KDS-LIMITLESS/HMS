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
exports.filterTables = exports.clearTables = exports.getTableDiscount = exports.getTableDateAndTime = exports.closeTable = exports.getWaiterTables = exports.getAllTables = exports.createTable = void 0;
const table_1 = require("../models/table");
const item_1 = require("../models/item");
const process_1 = require("process");
// import { close_order_table, get_closed_tables } from "../models/table";
function createTable(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const ORDER = req.body.order;
        let table = yield (0, table_1.get_table)(req.body.table_name);
        let order;
        try {
            if (table.rowCount === 1) {
                console.log(`table exists`);
                return res.status(400).end(`Table already exists`);
            }
            if (table.rowCount === 0) {
                for (order of ORDER) {
                    let item = yield (0, item_1.get_item)(order['product']);
                    if (item === null) {
                        console.log(item);
                        console.log(`${order['product']} Not found`);
                        res.status(404).end(`Not Found!`);
                        (0, process_1.exit)();
                        //stop crashing the server here!!
                    }
                    ;
                    continue;
                }
            }
            yield (0, table_1.create_new_table)(req.body.table_name, req.body.activeUser);
            console.log(`Created table ${req.body.table_name}`);
            next();
        }
        catch (err) {
            console.log(err.message);
            res.status(400).send(err.message);
        }
    });
}
exports.createTable = createTable;
function getAllTables(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const TABLES = yield (0, table_1.get_all_tables)();
            if (TABLES)
                return res.status(200).send(TABLES === null || TABLES === void 0 ? void 0 : TABLES.rows);
            return res.status(404).send(`Table not found!`);
        }
        catch (err) {
            console.log(err.message);
            res.status(400).send(err.message);
        }
    });
}
exports.getAllTables = getAllTables;
function getWaiterTables(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield (0, table_1.get_all_waiter_tables)(req.body.activeUser);
            if (result)
                return res.status(200).send(result);
            return res.status(400).send(`None`);
        }
        catch (err) {
            console.log(err.message);
            return res.status(400).send(err.message);
        }
    });
}
exports.getWaiterTables = getWaiterTables;
function closeTable(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let getTable = yield (0, table_1.get_one_waiter_table)(req.body.table_name, req.body.activeUser);
        // const TABLE_CLOSED = await get_closed_tables(req.body.table_name);
        try {
            if (getTable.rows[0]['status'] === 'OPEN') {
                // console.log(req.body)
                yield (0, table_1.close_table)(req.body.activeUser, "CLOSED", req.body.table_name, req.body.cash, req.body.pos, req.body.credit, req.body.transfer, req.body.total, req.body.discount, req.body.complimentary_drink, req.body.complimentary_qty);
                // console.log(req.body)
                let time = yield (0, table_1.get_table_date_and_time)(req.body.table_name);
                return res.status(200).json({
                    closed_time: time.rows[0]['time'],
                    date: time.rows[0]['date'],
                    waiter: time.rows[0]['waiter']
                });
            }
            return res.status(400).send(`Table already closed or does not exist `);
        }
        catch (err) {
            console.log(err.message);
            return res.status(400).send(err.message);
        }
    });
}
exports.closeTable = closeTable;
function getTableDateAndTime(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let table = yield (0, table_1.get_table)(req.body.table_name);
            console.log(table.rowCount);
            if (table.rowCount === 1 && table.rows[0]['status'] === "CLOSED") {
                let dateTime = yield (0, table_1.get_table_date_and_time)(req.body.table_name);
                return res.json({
                    date: dateTime.rows[0]['date'],
                    time: dateTime.rows[0]['time']
                });
            }
            return res.status(400).send('Table not closed');
        }
        catch (err) {
            console.log(err.message);
            return res.status(400).send(`Null`);
        }
    });
}
exports.getTableDateAndTime = getTableDateAndTime;
function getTableDiscount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield (0, table_1.get_table_discount)(req.body.table_name);
        try {
            if (result.rowCount === 1)
                return res.status(200).json({
                    waiter: result.rows[0]['waiter'],
                    discount: result.rows[0]['discount'],
                    total: result.rows[0]['total'],
                    complimentary_drink: result.rows[0]['complimentary_drink'],
                    complimentary_qty: result.rows[0]['complimentary_qty']
                });
            return res.status(404).send('TABLE NOT FOUND!');
        }
        catch (e) {
            console.log(e.message);
            return res.status(400).send(e.message);
        }
    });
}
exports.getTableDiscount = getTableDiscount;
function clearTables(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let clear = yield (0, table_1.clear_tables)();
        return res.status(200).send(`TABLES CLEARED`);
    });
}
exports.clearTables = clearTables;
function filterTables(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let tables = yield (0, table_1.filter_tables)(req.body.from, req.body.to);
        if (tables.rowCount > 0)
            return res.status(200).send(tables.rows);
        return res.status(400).send('None');
    });
}
exports.filterTables = filterTables;
