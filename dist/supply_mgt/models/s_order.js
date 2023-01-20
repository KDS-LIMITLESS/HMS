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
exports.cancel_supply_order = exports.receive_supply_order = exports.place_supply_order = exports.get_order = exports.create_supply_orders_table = void 0;
const connection_1 = require("../../connection");
const sql_template_strings_1 = require("sql-template-strings");
function create_supply_orders_table() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query(`CREATE TABLE IF NOT EXISTS s_orders(
        id BIGSERIAL PRIMARY KEY,
        item VARCHAR REFERENCES item(products) ON DELETE CASCADE,
        quantity INTEGER NOT NULL,
        size INTEGER NOT NULL,
        unitPrice INTEGER, 
        measure VARCHAR,
        supplier VARCHAR REFERENCES suppliers(name) ON DELETE CASCADE,
        status VARCHAR DEFAULT 'PENDING'
    )`);
    });
}
exports.create_supply_orders_table = create_supply_orders_table;
function get_order(supplier, item, status) {
    return __awaiter(this, void 0, void 0, function* () {
        let order = yield connection_1.db.query((0, sql_template_strings_1.SQL) `SELECT supplier, item, status FROM s_orders
        WHERE supplier = ${supplier}, item = ${item}, status = 'PENDING'`);
        return order;
    });
}
exports.get_order = get_order;
function place_supply_order(item, quantity, size, unitPrice, measure, supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.SQL) `INSERT INTO s_orders(item, quantity, size,
            unitPrice, measure, supplier)

            VALUES(${item}, ${quantity}, ${size}, ${unitPrice}, ${measure}, ${supplier})`);
        return result;
    });
}
exports.place_supply_order = place_supply_order;
function receive_supply_order(supplier, item) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) `UPDATE s_orders SET status = 'RECEIVED' 
        WHERE supplier = ${supplier} AND item = ${item} AND status = 'PENDING'`);
    });
}
exports.receive_supply_order = receive_supply_order;
function cancel_supply_order(supplier, item) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) `UPDATE s_orders SET status = 'CANCELLED' 
        WHERE supplier = ${supplier} AND item = ${item} AND status = 'PENDING'`);
    });
}
exports.cancel_supply_order = cancel_supply_order;
