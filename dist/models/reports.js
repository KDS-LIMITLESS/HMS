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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear_db = exports.filter_waiter_items = exports.filter_items = exports.get_all_items_sold = exports.get_items = exports.get_distinct_items = exports.get_waiters = void 0;
const connection_1 = require("../connection");
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
// returns all the waiters that served items
function get_waiters() {
    return __awaiter(this, void 0, void 0, function* () {
        let waiter = yield connection_1.db.query((0, sql_template_strings_1.default) ` SELECT DISTINCT username FROM orders 
        LEFT JOIN tables
        ON tables.waiter = orders.username
        WHERE tables.delete_status = 'FALSE'`);
        return waiter;
    });
}
exports.get_waiters = get_waiters;
function get_distinct_items(waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        let item = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT DISTINCT item FROM orders 
        WHERE username = ${waiter}`);
        return item;
    });
}
exports.get_distinct_items = get_distinct_items;
function get_items(waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        let item = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT tables.status, item, quantity, price FROM orders 

        LEFT JOIN tables

        ON tables.table_name = orders.table_name

        WHERE username = ${waiter} AND tables.status = 'CLOSED' AND tables.delete_status = 'FALSE'`);
        return item;
    });
}
exports.get_items = get_items;
function get_all_items_sold() {
    return __awaiter(this, void 0, void 0, function* () {
        let allItems = yield connection_1.db.query(`SELECT tables.status, item, price, 
            quantity, department FROM orders

            LEFT JOIN tables

            ON tables.table_name = orders.table_name

            WHERE tables.status = 'CLOSED'
        `);
        return allItems;
    });
}
exports.get_all_items_sold = get_all_items_sold;
function filter_items(from_date, to_date) {
    return __awaiter(this, void 0, void 0, function* () {
        let allItems = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT tables.table_name, tables.status, tables.date, item, price, 
            quantity, department FROM orders

            LEFT JOIN tables

            ON tables.table_name = orders.table_name

            WHERE tables.status = 'CLOSED' AND tables.date BETWEEN ${from_date} AND ${to_date}
        `);
        return allItems;
    });
}
exports.filter_items = filter_items;
function filter_waiter_items(waiter, from_date, to_date) {
    return __awaiter(this, void 0, void 0, function* () {
        let allItems = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT tables.status, item, quantity, price FROM orders 

        LEFT JOIN tables

        ON tables.table_name = orders.table_name

        WHERE username = ${waiter} AND tables.status = 'CLOSED' 
            AND tables.date BETWEEN ${from_date} AND ${to_date}`);
        return allItems;
    });
}
exports.filter_waiter_items = filter_waiter_items;
function clear_db() {
    return __awaiter(this, void 0, void 0, function* () {
        let clear = connection_1.db.query((0, sql_template_strings_1.default) ` DELETE FROM orders;
        DELETE FROM tables;
        DELETE from notification`);
        return clear;
    });
}
exports.clear_db = clear_db;
