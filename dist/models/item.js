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
exports.add_item = exports.get_all_items_with_category = exports.get_product_price = exports.get_item = exports.get_all_items = exports.createItemsTable = void 0;
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const connection_1 = require("../connection");
function createItemsTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        db.query(`CREATE TABLE IF NOT EXISTS 
    item(
        product VARCHAR UNIQUE NOT NULL PRIMARY KEY,
        price INTEGER NOT NULL,
        category VARCHAR NOT NULL, image VARCHAR NOT NULL
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
function get_item(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `SELECT product FROM item WHERE product = ${product};`);
        if ((yield result).rowCount === 0)
            return null;
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
function add_item(product, price, category, image) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `INSERT INTO item(product, price, category, image) 
        VALUES(${product}, ${price}, ${category}, ${image});`);
        return yield result;
    });
}
exports.add_item = add_item;
