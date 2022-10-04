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
exports.clear_db = exports.get_all_items_sold = exports.get_items = exports.get_distinct_items = exports.get_waiters = exports.create_reports_table = void 0;
const connection_1 = require("../connection");
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
function create_reports_table() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query(`CREATE TABLE IF NOT EXISTS report (
        waiters_name VARCHAR NOT NULL REFERENCES users (username) ON DELETE SET NULL,
        date VARCHAR NOT NULL PRIMARY KEY DEFAULT TO_CHAR(CURRENT_TIMESTAMP, 'YYYMMDD')
    )`);
    });
}
exports.create_reports_table = create_reports_table;
// returns all the waiters that served items
function get_waiters() {
    return __awaiter(this, void 0, void 0, function* () {
        let waiter = yield connection_1.db.query((0, sql_template_strings_1.default) ` SELECT DISTINCT username FROM orders`);
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
        let item = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT item, quantity, price FROM orders 
        WHERE username = ${waiter}`);
        return item;
    });
}
exports.get_items = get_items;
function get_all_items_sold() {
    return __awaiter(this, void 0, void 0, function* () {
        let allItems = yield connection_1.db.query(`SELECT item, price, quantity, department FROM orders`);
        return allItems;
    });
}
exports.get_all_items_sold = get_all_items_sold;
function clear_db() {
    return __awaiter(this, void 0, void 0, function* () {
        let clear = connection_1.db.query((0, sql_template_strings_1.default) ` DELETE FROM orders;
        DELETE FROM tables;
        DELETE from notification`);
        return clear;
    });
}
exports.clear_db = clear_db;
