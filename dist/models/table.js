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
exports.delete_rows = exports.get_table = exports.get_all_tables = exports.get_waiter_tables = exports.create_new_table = exports.createTableManager = void 0;
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
function get_waiter_tables(waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        const result = db.query((0, sql_template_strings_1.default) `SELECT table_name FROM person WHERE waiter = ${waiter}`);
        if ((yield result).rowCount === 0)
            return null;
        return (yield result).rows;
    });
}
exports.get_waiter_tables = get_waiter_tables;
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
function delete_rows(table_name) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let del = db.query(`DELETE FROM person WHERE table_name = ${table_name}`);
        return del;
    });
}
exports.delete_rows = delete_rows;
