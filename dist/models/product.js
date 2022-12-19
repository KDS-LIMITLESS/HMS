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
exports.update_item = exports.update_item_in_pos = exports.get_product_in_department = exports.send_item_to_pos_department = exports.delete_product = exports.get_drinks_in_department = exports.get_all_items_in_category = exports.get_product_price = exports.createProductTable = void 0;
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const connection_1 = require("../connection");
function createProductTable() {
    return __awaiter(this, void 0, void 0, function* () {
        connection_1.db.query(`CREATE TABLE IF NOT EXISTS 
    products(
        id BIGSERIAL PRIMARY KEY,
        product VARCHAR REFERENCES item(product) ON DELETE CASCADE ON UPDATE CASCADE,
        price INTEGER  NOT NULL DEFAULT 0,
        category VARCHAR NOT NULL, 
        quantity INTEGER DEFAULT 0,
        image VARCHAR,
        department VARCHAR REFERENCES dept(department) ON DELETE NO ACTION ON UPDATE NO ACTION,
        date DATE NOT NULL DEFAULT CURRENT_DATE
    )`, (err, result) => {
            if (err)
                return console.error(err.message);
            return result;
        });
    });
}
exports.createProductTable = createProductTable;
function get_product_price(product) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT price FROM products WHERE product = ${product}`);
        return result;
    });
}
exports.get_product_price = get_product_price;
function get_all_items_in_category(itemCategory, department) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = connection_1.db.query((0, sql_template_strings_1.default) `SELECT * FROM products WHERE category = ${itemCategory} 
            AND department = ${department};`);
        return result;
    });
}
exports.get_all_items_in_category = get_all_items_in_category;
function get_drinks_in_department(department) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = connection_1.db.query((0, sql_template_strings_1.default) `SELECT DISTINCT product, price, quantity, 
        category, department, image, date FROM products
        WHERE department = ${department}`);
        return (yield result).rows;
    });
}
exports.get_drinks_in_department = get_drinks_in_department;
function delete_product(item, department) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `DELETE FROM products 
        WHERE product = ${item} AND department = ${department}`);
        return result;
    });
}
exports.delete_product = delete_product;
function send_item_to_pos_department(product, department, quantity, image, category, price) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) ` INSERT INTO products(product, department, quantity, image, category, price)
        VALUES(${product}, ${department}, ${quantity}, ${image}, ${category}, ${price});`);
        return result;
    });
}
exports.send_item_to_pos_department = send_item_to_pos_department;
function get_product_in_department(product, dept) {
    return __awaiter(this, void 0, void 0, function* () {
        let item = yield connection_1.db.query((0, sql_template_strings_1.default) ` SELECT product, quantity FROM products WHERE product = ${product} AND
        department = ${dept} `);
        return item;
    });
}
exports.get_product_in_department = get_product_in_department;
function update_item_in_pos(product, quantity, department, price) {
    return __awaiter(this, void 0, void 0, function* () {
        let prod = yield connection_1.db.query((0, sql_template_strings_1.default) ` UPDATE products SET quantity = ${quantity},price = ${price},
        date =  CURRENT_DATE
        WHERE product = ${product} AND department = ${department}; `);
        return prod;
    });
}
exports.update_item_in_pos = update_item_in_pos;
function update_item(product, price, department) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `UPDATE products SET price = ${price} 
        WHERE product = ${product} AND department = ${department}`);
        return result;
    });
}
exports.update_item = update_item;
