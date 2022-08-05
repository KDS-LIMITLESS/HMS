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
exports.get_waiters_that_closed_tables = exports.create_reports_table = void 0;
const connection_1 = require("../connection");
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
function create_reports_table() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        return yield db.query(`CREATE TABLE IF NOT EXISTS report (
        waiters_name VARCHAR NOT NULL REFERENCES users (username) ON DELETE SET NULL,
        date VARCHAR NOT NULL PRIMARY KEY DEFAULT TO_CHAR(CURRENT_TIMESTAMP, 'YYYMMDD')
    )`);
    });
}
exports.create_reports_table = create_reports_table;
function get_waiters_that_closed_tables() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let waiter = yield db.query((0, sql_template_strings_1.default) `SELECT waiter, date from tables`);
        return waiter;
    });
}
exports.get_waiters_that_closed_tables = get_waiters_that_closed_tables;
