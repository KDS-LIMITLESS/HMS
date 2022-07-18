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
exports.delete_order = exports.count_waiters_order = exports.get_all_orders = exports.update_order_quantity = exports.get_drinks_in_table = exports.get_table_orders_for_admin = exports.get_table_orders = exports.new_order = exports.create_Order_Table = void 0;
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const connection_1 = require("../connection");
const table_1 = require("./table");
function create_Order_Table() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        return yield db.query(`CREATE TABLE IF NOT EXISTS orders (
        id BIGSERIAL PRIMARY KEY, 
        username VARCHAR NOT NULL REFERENCES users(username),
        
        item VARCHAR NOT NULL ,
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        category VARCHAR NOT NULL,
        image VARCHAR NOT NULL,
        department VARCHAR NOT NULL,

        table_name VARCHAR NOT NULL REFERENCES tables(table_name),
        
        time VARCHAR,
        FOREIGN KEY (department, item ) REFERENCES item(department, product)
    )`);
    });
}
exports.create_Order_Table = create_Order_Table;
function new_order(username, item, price, quantity, category, image, department, table_name, time) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        try {
            yield db.query('BEGIN');
            let result = yield db.query((0, sql_template_strings_1.default) `INSERT INTO orders (
            username, item, price, quantity, category, image, department,
                table_name, time)
    
        VALUES (${username}, ${item}, ${price}, ${quantity}, ${category}, 
                ${image}, ${department}, ${table_name}, ${time})`);
            yield db.query('COMMIT');
            console.log('Committing ');
            return result;
        }
        catch (e) {
            yield db.query('ROLLBACK');
            // await delete_order(table_name);
            yield (0, table_1.delete_table)(table_name, username);
            console.log('Rolling back');
            throw e;
        }
    });
}
exports.new_order = new_order;
function get_table_orders(name, tbl) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        const result = db.query((0, sql_template_strings_1.default) `SELECT username, item, price, quantity, category, image, department FROM orders 
            WHERE username = ${name} AND table_name = ${tbl}`);
        if ((yield result).rowCount === 0)
            return null;
        return (yield result).rows;
    });
}
exports.get_table_orders = get_table_orders;
function get_table_orders_for_admin(tbl_name) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        const result = db.query((0, sql_template_strings_1.default) `SELECT username, item, price, quantity, category, image, department FROM orders 
        WHERE table_name = ${tbl_name}`);
        if ((yield result).rowCount === 0)
            return null;
        return (yield result).rows;
    });
}
exports.get_table_orders_for_admin = get_table_orders_for_admin;
function get_drinks_in_table(item, col) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `SELECT item, price, quantity, category, image FROM orders 
            WHERE item = ${item} AND table_name = ${col}`);
        // if (result.rowCount === 0) return null;
        return result;
    });
}
exports.get_drinks_in_table = get_drinks_in_table;
function update_order_quantity(item, quantity, tbl) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `UPDATE orders SET quantity = ${quantity} 
        WHERE item = ${item} AND table_name = ${tbl}`);
        // if (result.rowCount === 0) return null;
        return result;
    });
}
exports.update_order_quantity = update_order_quantity;
function get_all_orders() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let orders = yield db.query((0, sql_template_strings_1.default) `SELECT * FROM orders`);
        return orders;
    });
}
exports.get_all_orders = get_all_orders;
function count_waiters_order(waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let orderCount = yield db.query((0, sql_template_strings_1.default) `SELECT username, item FROM orders WHERE username = ${waiter}`);
        return orderCount;
    });
}
exports.count_waiters_order = count_waiters_order;
function delete_order(table_name, item) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `DELETE FROM orders 
    WHERE table_name = ${table_name} AND item = ${item}`);
        return result;
    });
}
exports.delete_order = delete_order;
