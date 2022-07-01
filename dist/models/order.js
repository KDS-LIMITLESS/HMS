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
exports.get_all_order = exports.new_order = exports.createOrderTable = void 0;
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
const connection_1 = require("../connection");
function createOrderTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        db.query(`CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY, 
        username VARCHAR NOT NULL references users(username),
        item VARCHAR NOT NULL references item(product),
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        total_amount INTEGER NOT NULL,
        time VARCHAR
    )`);
    });
}
exports.createOrderTable = createOrderTable;
function new_order(username, item, price, quantity, total_amount, time) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `INSERT INTO orders (username, item, price, quantity, total_amount, time)
        VALUES (${username}, ${item}, ${price}, ${quantity}, ${total_amount}, ${time})`);
        return result;
    });
}
exports.new_order = new_order;
function get_all_order() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.get_all_order = get_all_order;
