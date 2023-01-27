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
exports.get_total = exports.get_all_received_orders = exports.get_all_placed_order = exports.cancel_supply_order = exports.receive_supply_order = exports.place_supply_order = exports.get_order = exports.create_supply_orders_table = void 0;
const connection_1 = require("../../connection");
const sql_template_strings_1 = require("sql-template-strings");
function create_supply_orders_table() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query(`CREATE TABLE IF NOT EXISTS s_orders(
        id BIGSERIAL PRIMARY KEY,
        item VARCHAR,
        quantity INTEGER NOT NULL,
        size INTEGER NOT NULL,
        unitPrice INTEGER, 
        total_price INTEGER NOT NULL,
        measure VARCHAR,
        supplier VARCHAR REFERENCES suppliers(name) ON DELETE CASCADE,
        status VARCHAR DEFAULT 'PENDING',
        date DATE NOT NULL DEFAULT CURRENT_DATE
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
function place_supply_order(item, quantity, size, unitPrice, measure, supplier, total_price) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.SQL) `INSERT INTO s_orders(item, quantity, size,
            unitPrice, measure, supplier, total_price)

            VALUES(${item}, ${quantity}, ${size}, ${unitPrice}, ${measure}, ${supplier}, 
                ${total_price})`);
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
function get_all_placed_order(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * FROM s_orders WHERE status = 'PENDING' AND 
        supplier = ${supplier} `);
    });
}
exports.get_all_placed_order = get_all_placed_order;
function get_all_received_orders(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * FROM s_orders WHERE status = 'PENDING' AND 
        supplier = ${supplier}  `);
    });
}
exports.get_all_received_orders = get_all_received_orders;
function get_total(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT SUM(total_price) AS total_placed FROM s_orders 
        WHERE supplier = ${supplier}`);
    });
}
exports.get_total = get_total;
