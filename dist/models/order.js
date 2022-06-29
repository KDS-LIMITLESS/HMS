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
Object.defineProperty(exports, "__esModule", { value: true });
exports.new_order = exports.createOrderTable = void 0;
const connection_1 = require("../connection");
function createOrderTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        db.query(`CREATE TABLE IF NOT EXISTS orders (
        waiter VARCHAR NOT NULL,
        item VARCHAR NOT NULL,
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        amount INTEGER NOT NULL,
        time DATE
    )`);
    });
}
exports.createOrderTable = createOrderTable;
function new_order() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
    });
}
exports.new_order = new_order;
