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
exports.update_reorder_level = exports.update_item_quantity = exports.get_date = exports.delete_item = exports.update_item_status = exports.get_product_image = exports.reduce_item_quantity = exports.add_item = exports.get_item = exports.get_all_items = exports.createItemsTable = void 0;
const connection_1 = require("../../connection");
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
function createItemsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        connection_1.db.query(`CREATE TABLE IF NOT EXISTS 
    item(
        product VARCHAR PRIMARY KEY,
        quantity INTEGER, 
        size INTEGER,
        metric VARCHAR,
        image VARCHAR,
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
function add_item(product, quantity, image, size, metric, reorder) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `INSERT INTO item(product, quantity, 
        image, size, metric, reorder) 

        VALUES(${product}, ${quantity}, ${image}, ${size}, ${metric}, ${reorder});`);
        return result;
    });
}
exports.add_item = add_item;
function reduce_item_quantity(products, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        let product = yield connection_1.db.query((0, sql_template_strings_1.default) ` UPDATE item SET quantity = ${quantity} WHERE product = ${products}; `);
        return product;
    });
}
exports.reduce_item_quantity = reduce_item_quantity;
function get_product_image(product) {
    return __awaiter(this, void 0, void 0, function* () {
        let image = yield connection_1.db.query((0, sql_template_strings_1.default) ` SELECT image from item WHERE product = ${product} `);
        return image.rows[0]['image'];
    });
}
exports.get_product_image = get_product_image;
// ims functions
function update_item_status(product) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `UPDATE item SET deleted_status = 'TRUE' 
        WHERE product = ${product}`);
        return result;
    });
}
exports.update_item_status = update_item_status;
function delete_item(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `DELETE FROM item WHERE product = ${item}`);
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
