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
exports.close_table = exports.delete_table = exports.get_one_waiter_table = exports.get_table_discount = exports.get_table = exports.get_all_tables = exports.get_all_waiter_tables = exports.create_new_table = exports.createTableManager = void 0;
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const connection_1 = require("../connection");
function createTableManager() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        return db.query(`CREATE TABLE IF NOT EXISTS tables (
        table_name VARCHAR NOT NULl PRIMARY KEY,
        waiter VARCHAR NOT NULL references users(username),
        status VARCHAR NOT NULL DEFAULT 'OPEN',
        cash INTEGER DEFAULT 0,
        pos INTEGER  DEFAULT 0,
        transfer INTEGER  DEFAULT 0,
        credit INTEGER DEFAULT 0,
        total INTEGER NOT NULL DEFAULT 0,   
        discount INTEGER DEFAULT 0
    )`);
    });
}
exports.createTableManager = createTableManager;
function create_new_table(tableName, waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `INSERT INTO tables (table_name, waiter) 
                        VALUES(${tableName}, ${waiter})`);
        return result;
    });
}
exports.create_new_table = create_new_table;
function get_all_waiter_tables(waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        const result = yield db.query((0, sql_template_strings_1.default) `SELECT * FROM tables WHERE waiter = ${waiter}`);
        if (result.rowCount === 0)
            return null;
        return result.rows;
    });
}
exports.get_all_waiter_tables = get_all_waiter_tables;
function get_all_tables() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `SELECT * FROM tables`);
        if ((yield result).rowCount === 0)
            return null;
        return result;
    });
}
exports.get_all_tables = get_all_tables;
function get_table(table_name) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `SELECT table_name FROM tables WHERE table_name = ${table_name}`);
        return result;
    });
}
exports.get_table = get_table;
function get_table_discount(table_name) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `SELECT waiter, discount, total FROM tables WHERE table_name = ${table_name}`);
        return result;
    });
}
exports.get_table_discount = get_table_discount;
function get_one_waiter_table(tbl_name, waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `SELECT table_name, status from tables 
            WHERE table_name = ${tbl_name} AND waiter = ${waiter}`);
        return result;
    });
}
exports.get_one_waiter_table = get_one_waiter_table;
function delete_table(table_name, waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        const DEL_TABLE = yield db.query(`DELETE FROM tables WHERE table_name = ${table_name} 
                                AND waiter = ${waiter}`);
        return DEL_TABLE;
    });
}
exports.delete_table = delete_table;
function close_table(waiter, status, tbl_name, cash, pos, credit, transfer, total, discount) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `UPDATE tables SET status = ${status}, 
        cash = ${cash}, pos = ${pos}, transfer = ${transfer}, credit = ${credit}, 
        total = ${total}, discount = ${discount}
        WHERE table_name = ${tbl_name} AND waiter = ${waiter}`);
        return result;
    });
}
exports.close_table = close_table;
// export async function closed_Tables_db() {
//     const db = await dbConnection();
//     return await db.query(`CREATE TABLE IF NOT EXISTS closedtbl(
//         waiter VARCHAR NOT NULL references users(username),
//         table_name VARCHAR NOT NULL REFERENCES tables(table_name) PRIMARY KEY,
//         cash VARCHAR NOT NULL,
//         total INTEGER NOT NULL,
//         time VARCHAR NOT NULL
//     )`)
// }
// 
// export async function close_order_table(waiter: string, tbl_name: string, cash: string, 
//                 total: number, time: string) {
//     const db = await dbConnection();
//     let result = await db.query(SQL `INSERT INTO closedtbl ( waiter, table_name, cash, total, time ) 
//         VALUES (${waiter}, ${tbl_name}, ${cash}, ${total}, ${time})`)
// 
//     return result;
// }
// 
// export async function get_closed_tables(tbl_name:string) {
//     const db = await dbConnection() ;
//     const result = await db.query(SQL `SELECT table_name FROM closedtbl WHERE table_name = ${tbl_name}` )
//     return result
// }
