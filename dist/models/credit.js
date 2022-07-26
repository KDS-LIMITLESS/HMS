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
exports.get_admin_users = exports.grant_credit = exports.create_credit_table = void 0;
const connection_1 = require("../connection");
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
function create_credit_table() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        return yield db.query(`CREATE TABLE IF NOT EXISTS credit(
        id SERIAL PRIMARY KEY,
        opening_credit INTEGER DEFAULT 0,
        credit_granted INTEGER DEFAULT 0,
        credit_remaining INTEGER DEFAULT 0,
        username VARCHAR REFERENCES users(username) ON DELETE SET NULL
    )`);
    });
}
exports.create_credit_table = create_credit_table;
function grant_credit(user, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = yield db.query((0, sql_template_strings_1.default) `INSERT INTO credit(username, opening_credit)
        VALUES(${user}, ${amount})`);
        return result;
    });
}
exports.grant_credit = grant_credit;
function get_admin_users() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let _ = yield db.query(`SELECT users.username, opening_credit, 
        credit_granted, credit_remaining FROM users
        
        LEFT JOIN credit 

        ON users.username = credit.username

        WHERE users.role = 'Super Admin' OR users.role = 'Auditor' OR users.role = 'Admin'
        `);
        return _;
    });
}
exports.get_admin_users = get_admin_users;
