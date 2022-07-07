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
exports.get_table = exports.create_new_table = exports.createTableManager = void 0;
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const connection_1 = require("../connection");
function createTableManager() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        return db.query(`CREATE TABLE IF NOT EXISTS person (
        id SERIAL PRIMARY KEY,
        table_name VARCHAR NOT NULl,
        waiter VARCHAR NOT NULL references users(username)
    )`);
    });
}
exports.createTableManager = createTableManager;
function create_new_table(table_name, waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `INSERT INTO person (table_name, waiter) 
                        VALUES(${table_name}, ${waiter})`);
        return result;
    });
}
exports.create_new_table = create_new_table;
function get_table(table_name) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        const result = db.query((0, sql_template_strings_1.default) `SELECT * FROM person WHERE table_name = ${table_name}`);
        return (yield result).rows[0]['table_name'];
    });
}
exports.get_table = get_table;
