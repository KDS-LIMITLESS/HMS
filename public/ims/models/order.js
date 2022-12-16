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
exports.calculate_cancelled_orders = exports.calculate_placed_orders = exports.count_cancelled_order = exports.count_received_order = exports.update_received_order_quantity = exports.get_received_orders = exports.get_cancelled_orders = exports.get_orders_by_date = exports.get_all_order = exports.get_order_by_status = exports.update_order_status = exports.get_one_order = exports.place_order = exports.create_inventory_order_table = void 0;
const connection_1 = require("../../connection");
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
// placing orders db
function create_inventory_order_table() {
    return __awaiter(this, void 0, void 0, function* () {
        return connection_1.db.query(` CREATE TABLE IF NOT EXISTS catalogue (
        product VARCHAR,
        qty INTEGER NOT NULL DEFAULT 0,
        received_qty INTEGR NOT NULL DEFAULT 0,
        size INTEGER DEFAULT 0,
        metric VARCHAR DEFAULT ' ',
        unitprice INTEGER DEFAULT 0,
        status VARCHAR DEFAULT 'PENDING',
        date DATE NOT NULL DEFAULT CURRENT_DATE
    )`);
        // refrence the items from the pos already
    });
}
exports.create_inventory_order_table = create_inventory_order_table;
function place_order(product, qty, received_qty, size, metric, unitPrice) {
    return __awaiter(this, void 0, void 0, function* () {
        let order = yield connection_1.db.query((0, sql_template_strings_1.default) ` INSERT INTO catalogue(product, qty, received_qty, size, metric, 
            unitprice) 
        
            VALUES (${product}, ${qty}, ${received_qty}, ${size}, ${metric}, ${unitPrice})`);
        return order;
    });
}
exports.place_order = place_order;
function get_one_order(order) {
    return __awaiter(this, void 0, void 0, function* () {
        let isOrder = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT product, received_qty FROM catalogue WHERE product = ${order}`);
        return isOrder;
    });
}
exports.get_one_order = get_one_order;
// export async function get_orders() {
//     let order = await db.query(SQL ` SELECT *, count(*) from catalogue `);
//     return order
// }
function update_order_status(product, status) {
    return __awaiter(this, void 0, void 0, function* () {
        let orderStatus = yield connection_1.db.query((0, sql_template_strings_1.default) ` UPDATE catalogue SET status = ${status}
        WHERE product = ${product}`);
        return orderStatus;
    });
}
exports.update_order_status = update_order_status;
function get_order_by_status(status) {
    return __awaiter(this, void 0, void 0, function* () {
        let orderStatus = yield connection_1.db.query((0, sql_template_strings_1.default) ` SELECT * FROM catalogue WHERE status = ${status}`);
        return orderStatus;
    });
}
exports.get_order_by_status = get_order_by_status;
function get_all_order() {
    return __awaiter(this, void 0, void 0, function* () {
        let order = yield connection_1.db.query((0, sql_template_strings_1.default) ` SELECT * FROM catalogue`);
        return order;
    });
}
exports.get_all_order = get_all_order;
function get_orders_by_date(from, to) {
    return __awaiter(this, void 0, void 0, function* () {
        const DATE = yield connection_1.db.query((0, sql_template_strings_1.default) ` SELECT * FROM catalogue WHERE date BETWEEN ${from} AND ${to} `);
        return DATE;
    });
}
exports.get_orders_by_date = get_orders_by_date;
function get_cancelled_orders() {
    return __awaiter(this, void 0, void 0, function* () {
        let order = yield connection_1.db.query(` SELECT * FROM catalogue WHERE status = 'CANCELLED' `);
        return order;
    });
}
exports.get_cancelled_orders = get_cancelled_orders;
function get_received_orders() {
    return __awaiter(this, void 0, void 0, function* () {
        let order = yield connection_1.db.query(` SELECT * FROM catalogue WHERE status = 'RECEIVED' `);
        return order;
    });
}
exports.get_received_orders = get_received_orders;
function update_received_order_quantity(qty, product) {
    return __awaiter(this, void 0, void 0, function* () {
        let order = yield connection_1.db.query((0, sql_template_strings_1.default) ` UPDATE catalogue SET received_qty = ${qty} WHERE product = ${product}  `);
        return order;
    });
}
exports.update_received_order_quantity = update_received_order_quantity;
function count_received_order() {
    return __awaiter(this, void 0, void 0, function* () {
        let count = yield connection_1.db.query(` SELECT count(*) FROM catalogue 
        WHERE date = CURRENT_DATE AND status = 'RECEIVED' `);
        return count;
    });
}
exports.count_received_order = count_received_order;
function count_cancelled_order() {
    return __awaiter(this, void 0, void 0, function* () {
        let count = yield connection_1.db.query(` SELECT count(*) FROM catalogue 
        WHERE date = CURRENT_DATE AND status = 'CANCELLED' `);
        return count;
    });
}
exports.count_cancelled_order = count_cancelled_order;
function calculate_placed_orders() {
    return __awaiter(this, void 0, void 0, function* () {
        let totals = yield connection_1.db.query(` SELECT SUM (qty * unitprice) as Total FROM catalogue 
        WHERE status = "PENDING" AND "RECEIVED" `);
        return totals;
    });
}
exports.calculate_placed_orders = calculate_placed_orders;
function calculate_cancelled_orders() {
    return __awaiter(this, void 0, void 0, function* () {
        let totals = yield connection_1.db.query(` SELECT SUM (qty * unitprice) as Total FROM catalogue 
        WHERE status = "CANCELLED" `);
        return totals;
    });
}
exports.calculate_cancelled_orders = calculate_cancelled_orders;
