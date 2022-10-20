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
exports.decrease_item_quantity_in_pos = exports.get_waiter_order = exports.get_order = exports.delete_order = exports.count_orders_in_closed_tables = exports.count_all_orders = exports.count_waiters_order = exports.get_all_orders = exports.update_order_quantity = exports.get_drinks_in_table = exports.get_table_orders_for_admin = exports.get_table_orders = exports.new_order = exports.create_Order_Table = void 0;
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const connection_1 = require("../connection");
const table_1 = require("./table");
function create_Order_Table() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query(`CREATE TABLE IF NOT EXISTS orders (
        id BIGSERIAL PRIMARY KEY, 
        username VARCHAR REFERENCES users(username) ON DELETE SET NULL,
        
        item VARCHAR  REFERENCES item(product),
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        category VARCHAR NOT NULL,
        image VARCHAR REFERENCES item(image) ON DELETE NO ACTION,
        department VARCHAR REFERENCES dept(department) ON DELETE NO ACTION,

        table_name VARCHAR NOT NULL REFERENCES tables(table_name) ON DELETE NO ACTION,
        time VARCHAR
    )`);
    });
}
exports.create_Order_Table = create_Order_Table;
function new_order(username, item, price, quantity, category, image, department, table_name, time) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield connection_1.db.query((0, sql_template_strings_1.default) `INSERT INTO orders (
            username, item, price, quantity, category, image, department,
                table_name, time)
    
        VALUES (${username}, ${item}, ${price}, ${quantity}, ${category}, 
                ${image}, ${department}, ${table_name}, ${time})`);
            return result;
        }
        catch (e) {
            yield (0, table_1.delete_table)(table_name, username);
            console.log('Rolling back');
            throw e;
        }
    });
}
exports.new_order = new_order;
function get_table_orders(name, tbl) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = connection_1.db.query((0, sql_template_strings_1.default) `SELECT username, item, price, quantity, category, image, department FROM orders 
            WHERE username = ${name} AND table_name = ${tbl}`);
        if ((yield result).rowCount === 0)
            return null;
        return (yield result).rows;
    });
}
exports.get_table_orders = get_table_orders;
function get_table_orders_for_admin(tbl_name) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = connection_1.db.query((0, sql_template_strings_1.default) `SELECT username, item, price, quantity, category, image, department FROM orders 
        WHERE table_name = ${tbl_name}`);
        if ((yield result).rowCount === 0)
            return null;
        return (yield result).rows;
    });
}
exports.get_table_orders_for_admin = get_table_orders_for_admin;
function get_drinks_in_table(item, col) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT item, price, quantity, category, image FROM orders 
            WHERE item = ${item} AND table_name = ${col}`);
        // if (result.rowCount === 0) return null;
        return result;
    });
}
exports.get_drinks_in_table = get_drinks_in_table;
function update_order_quantity(item, quantity, tbl) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `UPDATE orders SET quantity = ${quantity} 
        WHERE item = ${item} AND table_name = ${tbl}`);
        // if (result.rowCount === 0) return null;
        return result;
    });
}
exports.update_order_quantity = update_order_quantity;
function get_all_orders() {
    return __awaiter(this, void 0, void 0, function* () {
        let orders = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT * FROM orders`);
        return orders;
    });
}
exports.get_all_orders = get_all_orders;
function count_waiters_order(waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        let orderCount = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT username, item FROM orders WHERE username = ${waiter}`);
        return orderCount;
    });
}
exports.count_waiters_order = count_waiters_order;
function count_all_orders() {
    return __awaiter(this, void 0, void 0, function* () {
        let count = yield connection_1.db.query((0, sql_template_strings_1.default) ` SELECT * FROM orders; `);
        return count;
    });
}
exports.count_all_orders = count_all_orders;
function count_orders_in_closed_tables() {
    return __awaiter(this, void 0, void 0, function* () {
        let count = yield connection_1.db.query((0, sql_template_strings_1.default) ` SELECT count(*), tables.status FROM orders
            LEFT JOIN tables
            ON orders.table_name = tables.table_name
            WHERE tables.table_name = 'CLOSED'
            GROUP BY tables.status; `);
        return count;
    });
}
exports.count_orders_in_closed_tables = count_orders_in_closed_tables;
function delete_order(table_name, item) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `DELETE FROM orders 
    WHERE table_name = ${table_name} AND item = ${item}`);
        return result;
    });
}
exports.delete_order = delete_order;
function get_order(table_name, product) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT item, username, table_name, department, quantity
        FROM orders 
        WHERE table_name = ${table_name} AND item = ${product}`);
        return result;
    });
}
exports.get_order = get_order;
function get_waiter_order(waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        let _ = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT item, quantity FROM orders WHERE username = ${waiter}`);
        return _;
    });
}
exports.get_waiter_order = get_waiter_order;
// pos ----> ims/item
function decrease_item_quantity_in_pos(product, quantity, department) {
    return __awaiter(this, void 0, void 0, function* () {
        let prod = yield connection_1.db.query((0, sql_template_strings_1.default) ` UPDATE products SET quantity = ${quantity}
        WHERE product = ${product} AND department = ${department}; `);
        return prod;
    });
}
exports.decrease_item_quantity_in_pos = decrease_item_quantity_in_pos;
const x = function reduceQuantity(oldQuantity, newQuantity) {
    return __awaiter(this, void 0, void 0, function* () {
        return newQuantity;
    });
};
