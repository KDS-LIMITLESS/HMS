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
exports.update_reorder_level = exports.update_item_quantity = exports.update_item = exports.get_date = exports.delete_item = exports.get_drinks_in_department = exports.add_item = exports.get_all_items_in_category = exports.get_product_price = exports.get_item = exports.get_all_items = exports.createItemsTable = void 0;
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const connection_1 = require("../connection");
function createItemsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        connection_1.db.query(`CREATE TABLE IF NOT EXISTS 
    item(
        product VARCHAR PRIMARY KEY,
        quantity INTEGER, 
        size INTEGER,
        metric VARCHAR,
        image VARCHAR UNIQUE,
        reorder INTEGER DEFAULT 0,
        deleted_status VARCHAR DEFAULT 'FALSE',
        date DATE NOT NULL DEFAULT CURRENT_DATE
    )`, (err, result) => {
            if (err)
                return console.error(err.message);
            return result;
        });
    });
}
exports.createItemsTable = createItemsTable;
// add another table for sending items 
// itemName price department 
// total orders  count api
// add images table
// modify the add new item functions
//   modify update item functions 
// modify delete item 
// modify all get items functions
// table for products of each dept. with price
function get_all_items() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = connection_1.db.query('SELECT * FROM item');
        return result;
    });
}
exports.get_all_items = get_all_items;
function get_item(product) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT product, quantity, deleted_status FROM item 
        WHERE product = ${product};`);
        return result;
    });
}
exports.get_item = get_item;
// product table
function get_product_price(product) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT price FROM products WHERE product = ${product}`);
        return result;
    });
}
exports.get_product_price = get_product_price;
// start from here 
function get_all_items_in_category(itemCategory, department) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = connection_1.db.query((0, sql_template_strings_1.default) `SELECT * FROM products WHERE category = ${itemCategory} 
            AND department = ${department};`);
        return result;
    });
}
exports.get_all_items_in_category = get_all_items_in_category;
function add_item(product, quantity, image, size, metric, reorder) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `INSERT INTO item(product, quantity, 
        image, size, metric, reorder) 

        VALUES(${product}, ${quantity}, ${image}, ${size}, ${metric}, ${reorder});`);
        return result;
    });
}
exports.add_item = add_item;
// product table
function get_drinks_in_department(department) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = connection_1.db.query((0, sql_template_strings_1.default) `SELECT DISTINCT product, price, quantity, 
        category, department, image, date FROM products
        WHERE department = ${department}`);
        return (yield result).rows;
    });
}
exports.get_drinks_in_department = get_drinks_in_department;
function delete_item(item, department) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `DELETE FROM products 
        WHERE product = ${item} AND department = ${department}`);
        return result;
    });
}
exports.delete_item = delete_item;
function get_date(from, to) {
    return __awaiter(this, void 0, void 0, function* () {
        const DATE = yield connection_1.db.query((0, sql_template_strings_1.default) ` SELECT * FROM item WHERE date BETWEEN ${from} AND ${to} `);
        return DATE;
    });
}
exports.get_date = get_date;
function update_item(product, price, department) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `UPDATE products SET price = ${price} 
        WHERE product = ${product} AND department = ${department}`);
        return result;
    });
}
exports.update_item = update_item;
function update_item_quantity(product, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `UPDATE item SET quantity = ${quantity} WHERE product = ${product}`);
        return result;
    });
}
exports.update_item_quantity = update_item_quantity;
function update_reorder_level(product, reorder) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `UPDATE item SET reorder = ${reorder} WHERE product = ${product}`);
        return result;
    });
}
exports.update_reorder_level = update_reorder_level;
// route for deleting items from ims item
// how do i make updates on tables to reflect on other tables in postgres
// get all products sent to departments 
// from the pos, see all items in product categorize by department
