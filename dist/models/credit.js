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
exports.get_credit_balance = exports.get_credit_status = exports.get_admin_users = exports.calculate_credit_balance = exports.update_credit_status = exports.grant_credit = exports.create_credit_table = void 0;
const connection_1 = require("../connection");
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
function create_credit_table() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query(`CREATE TABLE IF NOT EXISTS credit(
        id SERIAL PRIMARY KEY,
        opening_credit INTEGER DEFAULT 0,
        credit_granted INTEGER DEFAULT 0,
        credit_remaining INTEGER DEFAULT 0,
        username VARCHAR REFERENCES users(username) ON DELETE SET NULL
    )`);
    });
}
exports.create_credit_table = create_credit_table;
function grant_credit(user, opening_credit, credit_remaining) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `INSERT INTO credit(username, opening_credit, credit_remaining)
        VALUES(${user}, ${opening_credit}, ${credit_remaining})`);
        return result;
    });
}
exports.grant_credit = grant_credit;
function update_credit_status(user, opening_credit, credit_remaining) {
    return __awaiter(this, void 0, void 0, function* () {
        let creditResult = yield connection_1.db.query((0, sql_template_strings_1.default) `UPDATE credit SET 
        opening_credit = ${opening_credit}, credit_remaining = ${credit_remaining}
        WHERE username = ${user}`);
        return creditResult;
    });
}
exports.update_credit_status = update_credit_status;
function calculate_credit_balance(user, credit_remaining, credit_granted) {
    return __awaiter(this, void 0, void 0, function* () {
        let updateBalance = yield connection_1.db.query((0, sql_template_strings_1.default) `UPDATE credit SET credit_remaining = ${credit_remaining},
        credit_granted = ${credit_granted} WHERE username = ${user}`);
        return updateBalance;
    });
}
exports.calculate_credit_balance = calculate_credit_balance;
function get_admin_users() {
    return __awaiter(this, void 0, void 0, function* () {
        let _ = yield connection_1.db.query(`SELECT users.username, opening_credit, 
        credit_granted, credit_remaining FROM users
        
        LEFT JOIN credit 

        ON users.username = credit.username

        WHERE users.role = 'Super Admin' OR users.role = 'Auditor' OR users.role = 'Admin'
        `);
        return _;
    });
}
exports.get_admin_users = get_admin_users;
function get_credit_status(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let _ = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT credit_remaining, credit_granted, opening_credit
        FROM credit WHERE username = ${user}`);
        return _;
    });
}
exports.get_credit_status = get_credit_status;
function get_credit_balance(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let balance = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT * FROM credit WHERE user = ${user}`);
        return balance;
    });
}
exports.get_credit_balance = get_credit_balance;
