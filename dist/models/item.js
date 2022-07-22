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
exports.update_item = exports.delete_item = exports.get_drinks_in_department = exports.add_item = exports.get_all_items_with_category = exports.get_product_price = exports.get_item = exports.get_all_items = exports.createItemsTable = void 0;
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const connection_1 = require("../connection");
function createItemsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        db.query(`CREATE TABLE IF NOT EXISTS 
    item(
        department VARCHAR NOT NULL,
        product VARCHAR NOT NULL,
        price INTEGER NOT NULL,
        category VARCHAR NOT NULL, 
        image VARCHAR NOT NULL,
        
        PRIMARY KEY (department,product)
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
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query('SELECT * FROM item');
        return result;
    });
}
exports.get_all_items = get_all_items;
function get_item(product, department) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `SELECT product, department FROM item 
                WHERE product = ${product} AND department = ${department};`);
        return result;
    });
}
exports.get_item = get_item;
function get_product_price(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `SELECT price FROM item WHERE product = ${product}`);
        if ((yield result).rowCount === 0)
            return null;
        return (yield result).rows[0]['price'];
    });
}
exports.get_product_price = get_product_price;
function get_all_items_with_category(itemCategory) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `SELECT * FROM item WHERE category = ${itemCategory};`);
        return result;
    });
}
exports.get_all_items_with_category = get_all_items_with_category;
function add_item(product, price, category, image, department) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `INSERT INTO item(product, price, category, image, department) 
        VALUES(${product}, ${price}, ${category}, ${image}, ${department});`);
        return result;
    });
}
exports.add_item = add_item;
function get_drinks_in_department(department) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `SELECT * FROM item 
            WHERE department = ${department}`);
        return result;
    });
}
exports.get_drinks_in_department = get_drinks_in_department;
function delete_item(item, department) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `DELETE FROM item WHERE product = ${item} AND department = ${department}`);
        return result;
    });
}
exports.delete_item = delete_item;
function update_item(product, price) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `UPDATE item SET price = ${price} WHERE product = ${product}`);
        return result;
    });
}
exports.update_item = update_item;
