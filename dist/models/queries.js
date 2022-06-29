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
exports.add_item = exports.get_all_item_with_category = exports.get_single_item = exports.queryOne = exports.get_all_item = exports.create_items_table = void 0;
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const connection_1 = require("../connection");
function create_items_table() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        db.query(`CREATE TABLE IF NOT EXISTS 
    item(
        product VARCHAR UNIQUE NOT NULL PRIMARY KEY,
        price INTEGER NOT NULL,
        category VARCHAR 
    )`, (err, result) => {
            if (err)
                return console.error(err.message);
            return result;
        });
    });
}
exports.create_items_table = create_items_table;
function get_all_item() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        db.query('SELECT * FROM item', (err, result) => {
            if (err)
                return console.error(err.message);
            return result;
        });
    });
}
exports.get_all_item = get_all_item;
function queryOne(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        db.query(`SELECT product FROM item WHERE product = $product`, [product], (err, result) => {
            if (err)
                return console.error(err.message);
            return result;
        });
    });
}
exports.queryOne = queryOne;
function get_single_item(itemName) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `SELECT product FROM item WHERE product = ${itemName};`);
        if ((yield result).rowCount === 0)
            return null;
        return result;
    });
}
exports.get_single_item = get_single_item;
function get_all_item_with_category(itemCategory) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `SELECT * FROM item WHERE category = "${itemCategory}";`);
        return result;
    });
}
exports.get_all_item_with_category = get_all_item_with_category;
function add_item(product, price, category) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `INSERT INTO item(product, price, category) 
        VALUES("${product}", "${price}", "${category}");`);
        return result;
    });
}
exports.add_item = add_item;
