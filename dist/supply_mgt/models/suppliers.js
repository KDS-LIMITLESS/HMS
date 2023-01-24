"use strict";
// users -> name, gender, phone, email, address
// orders --> itemName, quantity, size, unitPrice, totalPrice, measureUnit Status: Pending
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
exports.new_supplier = exports.get_all_supplier = exports.find_supplier = exports.create_suppliers_table = void 0;
const connection_1 = require("../../connection");
const sql_template_strings_1 = require("sql-template-strings");
function create_suppliers_table() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query(`CREATE TABLE IF NOT EXISTS suppliers(
        name VARCHAR PRIMARY KEY NOT NULL,
        gender CHAR NOT NULL,
        phone VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        product VARCHAR
    )`);
    });
}
exports.create_suppliers_table = create_suppliers_table;
function find_supplier(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * from suppliers WHERE name = ${supplier}`);
    });
}
exports.find_supplier = find_supplier;
function get_all_supplier() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * from suppliers`);
    });
}
exports.get_all_supplier = get_all_supplier;
function new_supplier(name, email, phone, gender, address, product) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.SQL) `INSERT INTO suppliers(name, email, phone,
            gender, address, product)
            VALUES(${name}, ${email}, ${phone}, ${gender}, ${address}, ${product})`);
        return result;
    });
}
exports.new_supplier = new_supplier;
