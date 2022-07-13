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
exports.get_closed_tables = exports.close_order_table = exports.closed_Tables_db = exports.delete_rows = exports.get_one_waiter_table = exports.get_table = exports.get_all_tables = exports.get_all_waiter_tables = exports.create_new_table = exports.createTableManager = void 0;
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const connection_1 = require("../connection");
function createTableManager() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        return db.query(`CREATE TABLE IF NOT EXISTS person (
        table_name VARCHAR NOT NULl PRIMARY KEY,
        waiter VARCHAR NOT NULL references users(username)
    )`);
    });
}
exports.createTableManager = createTableManager;
function create_new_table(tableName, waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `INSERT INTO person (table_name, waiter) 
                        VALUES(${tableName}, ${waiter})`);
        return result;
    });
}
exports.create_new_table = create_new_table;
function get_all_waiter_tables(waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        const result = yield db.query((0, sql_template_strings_1.default) `SELECT table_name FROM person WHERE waiter = ${waiter}`);
        if (result.rowCount === 0)
            return null;
        return result.rows;
    });
}
exports.get_all_waiter_tables = get_all_waiter_tables;
function get_all_tables() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `SELECT table_name FROM person`);
        if ((yield result).rowCount === 0)
            return null;
        return result;
    });
}
exports.get_all_tables = get_all_tables;
function get_table(table) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `SELECT table_name FROM person WHERE table_name = ${table}`);
        if ((yield result).rowCount === 0)
            return null;
        return (yield result).rows;
    });
}
exports.get_table = get_table;
function get_one_waiter_table(tbl_name, waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `SELECT table_name from person 
            WHERE table_name = ${tbl_name} AND waiter = ${waiter}`);
        return result;
    });
}
exports.get_one_waiter_table = get_one_waiter_table;
function delete_rows(table_name) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let del = db.query(`DELETE FROM person WHERE table_name = ${table_name}`);
        return del;
    });
}
exports.delete_rows = delete_rows;
function closed_Tables_db() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        return yield db.query(`CREATE TABLE IF NOT EXISTS closedtbl(
        waiter VARCHAR NOT NULL references users(username),
        table_name VARCHAR NOT NULL REFERENCES person(table_name) PRIMARY KEY,
        payment_method VARCHAR NOT NULL,
        total INTEGER NOT NULL,
        status VARCHAR NOT NULL DEFAULT 'CLOSED',
        time VARCHAR NOT NULL
    )`);
    });
}
exports.closed_Tables_db = closed_Tables_db;
function close_order_table(waiter, tbl_name, payment_method, total, time) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `INSERT INTO closedtbl ( waiter, table_name, payment_method, total, time ) 
        VALUES (${waiter}, ${tbl_name}, ${payment_method}, ${total}, ${time})`);
        return result;
    });
}
exports.close_order_table = close_order_table;
function get_closed_tables(tbl_name) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        const result = yield db.query((0, sql_template_strings_1.default) `SELECT table_name FROM closedtbl WHERE table_name = ${tbl_name}`);
        return result;
    });
}
exports.get_closed_tables = get_closed_tables;
