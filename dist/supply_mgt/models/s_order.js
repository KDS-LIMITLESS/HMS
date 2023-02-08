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
exports.get_date = exports.get_order_counts = exports.get_all_received_orders = exports.get_all_placed_orders = exports.get_total = exports.get_all_returned_orders = exports.get_all_damaged_orders = exports.get_all_cancelled_orders = exports.get_all_supplier_received_orders = exports.get_all_supplier_placed_order = exports.cancel_supply_order = exports.receive_supply_order = exports.place_supply_order = exports.get_order = exports.create_supply_orders_table = void 0;
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
        orderDate TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP, 'DD-MM-YYYY')
    )`);
    });
}
exports.create_supply_orders_table = create_supply_orders_table;
function get_order(supplier, item, status) {
    return __awaiter(this, void 0, void 0, function* () {
        let order = yield connection_1.db.query((0, sql_template_strings_1.SQL) `SELECT supplier, item, status FROM s_orders
        WHERE supplier = ${supplier} AND item = ${item} AND status = 'PENDING'`);
        return order;
    });
}
exports.get_order = get_order;
function place_supply_order(item, quantity, size, unitPrice, measure, supplier, total_price, status) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.SQL) `INSERT INTO s_orders(item, quantity, size,
            unitPrice, measure, supplier, total_price, status)

            VALUES(${item}, ${quantity}, ${size}, ${unitPrice}, ${measure}, ${supplier}, 
                ${total_price}, ${status})`);
        return result;
    });
}
exports.place_supply_order = place_supply_order;
// what if received before trying to set damaged -- Error
function receive_supply_order(supplier, item) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) `UPDATE s_orders SET status = 'RECEIVED' 
        WHERE supplier = ${supplier} AND item = ${item} AND status = 'PENDING')`);
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
function get_all_supplier_placed_order(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * FROM s_orders WHERE status = 'PENDING' AND 
        supplier = ${supplier} `);
    });
}
exports.get_all_supplier_placed_order = get_all_supplier_placed_order;
function get_all_supplier_received_orders(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * FROM s_orders WHERE status = 'RECEIVED' AND 
        supplier = ${supplier}  `);
    });
}
exports.get_all_supplier_received_orders = get_all_supplier_received_orders;
function get_all_cancelled_orders(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * FROM s_orders WHERE status = 'CANCELLED' AND 
        supplier = ${supplier}  `);
    });
}
exports.get_all_cancelled_orders = get_all_cancelled_orders;
function get_all_damaged_orders(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * FROM s_orders WHERE status = 'DAMAGED' AND 
        supplier = ${supplier}  `);
    });
}
exports.get_all_damaged_orders = get_all_damaged_orders;
function get_all_returned_orders(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * FROM s_orders WHERE status = 'RETURNED' AND 
        supplier = ${supplier}  `);
    });
}
exports.get_all_returned_orders = get_all_returned_orders;
function get_total(supplier) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) ` (SELECT 'total' AS Type, SUM(total_price)  FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'PENDING')

        UNION
        
        (SELECT 'placed_orders', COUNT(item) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'PENDING')
        
        UNION 

        (SELECT 'received_orders', COUNT(item) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'RECEIVED')
        
        UNION 

        (SELECT 'cancelled_orders', COUNT(item) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'CANCELLED')

        UNION 

        (SELECT 'damaged_orders', COUNT(item) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'DAMAGED')

        UNION 

        (SELECT 'returned_orders', COUNT(item) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'RETURNED')
        
        UNION 

        (SELECT 'total_received', SUM(total_price) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'RECEIVED')

        UNION 

        (SELECT 'total_cancelled', SUM(total_price) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'CANCELLED')

        UNION 

        (SELECT 'total_damaged', SUM(total_price) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'DAMAGED')

        UNION 

        (SELECT 'total_returned', SUM(total_price) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'RETURNED')
        
    `);
    });
}
exports.get_total = get_total;
function get_all_placed_orders() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) `SELECT * FROM s_orders WHERE status = 'PENDING';
    `);
    });
}
exports.get_all_placed_orders = get_all_placed_orders;
function get_all_received_orders() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) `SELECT * FROM s_orders WHERE status = 'RECEIVED';
    `);
    });
}
exports.get_all_received_orders = get_all_received_orders;
function get_order_counts() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query((0, sql_template_strings_1.SQL) `SELECT 'placed_order' AS Type, COUNT(*) FROM 
        (SELECT item FROM s_orders WHERE status = 'PENDING') AS placed_order
        
        UNION

        SELECT 'received_order', COUNT(*) FROM 
        (SELECT item FROM s_orders WHERE status = 'RECEIVED') AS received_order
        
        UNION 

        (SELECT 'total_received', SUM(total_price) FROM s_orders 
        WHERE status = 'RECEIVED')

        UNION 

        (SELECT 'total_placed', SUM(total_price) FROM s_orders 
        WHERE status = 'PENDING')

        UNION 

        (SELECT 'total_supplier', COUNT(name) FROM suppliers)
        
    `);
    });
}
exports.get_order_counts = get_order_counts;
function get_date(from, to) {
    return __awaiter(this, void 0, void 0, function* () {
        const DATE = yield connection_1.db.query((0, sql_template_strings_1.SQL) ` SELECT * FROM s_orders WHERE status = 'PENDING' 
        AND orderDate BETWEEN ${from} AND ${to} `);
        return DATE;
    });
}
exports.get_date = get_date;
