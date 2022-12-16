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
exports.get_transaction_by_id = exports.delete_transaction = exports.get_date = exports.get_all_items_sent_to_department = exports.get_all_sent_items = exports.record_transactions = exports.create_transactions_table = void 0;
const sql_template_strings_1 = require("sql-template-strings");
const connection_1 = require("../../connection");
function create_transactions_table() {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_1.db.query(` CREATE TABLE IF NOT EXISTS transactions (
        id BIGSERIAL PRIMARY KEY,
        product VARCHAR REFERENCES item(product) ON DELETE CASCADE ON UPDATE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 0,
        price INTEGER  NOT NULL DEFAULT 0,
        size VARCHAR,
        description VARCHAR,
        portion VARCHAR,
        department VARCHAR REFERENCES dept(department) ON DELETE CASCADE,
        date DATE NOT NULL DEFAULT CURRENT_DATE
    )`);
    });
}
exports.create_transactions_table = create_transactions_table;
function record_transactions(product, department, quantity, description, portion, size, price) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.SQL) ` INSERT INTO transactions (product, department, 
        quantity, description, portion, size, price)
        VALUES(${product}, ${department}, ${quantity}, ${description}, ${portion}, ${size}, ${price});`);
        return result;
    });
}
exports.record_transactions = record_transactions;
function get_all_sent_items() {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * FROM transactions WHERE DATE = CURRENT_DATE`);
        return items;
    });
}
exports.get_all_sent_items = get_all_sent_items;
function get_all_items_sent_to_department(department) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * FROM transactions 
        WHERE DATE = CURRENT_DATE AND department = ${department}`);
        return items;
    });
}
exports.get_all_items_sent_to_department = get_all_items_sent_to_department;
function get_date(from, to) {
    return __awaiter(this, void 0, void 0, function* () {
        const DATE = yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * FROM transactions WHERE date BETWEEN ${from} AND ${to} `);
        return DATE;
    });
}
exports.get_date = get_date;
function delete_transaction(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let transaction = yield connection_1.db.query((0, sql_template_strings_1.SQL) `DELETE FROM transactions WHERE id = ${id}`);
        return transaction;
    });
}
exports.delete_transaction = delete_transaction;
function get_transaction_by_id(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT id, quantity, product, price, department
        FROM transactions WHERE id =  ${id} `);
        return transaction;
    });
}
exports.get_transaction_by_id = get_transaction_by_id;
