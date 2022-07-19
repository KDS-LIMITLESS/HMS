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
exports.delete_user = exports.suspend_user = exports.get_passcode = exports.get_user = exports.create_new_user = exports.createUsersTable = void 0;
const connection_1 = require("../connection");
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        db.query(` CREATE TABLE IF NOT EXISTS users (
        username VARCHAR NOT NULL PRIMARY KEY,
        password VARCHAR NOT NULL,
        role VARCHAR NOT NULL,
        passcode INTEGER NOT NULL UNIQUE,
        status VARCHAR NOT NULL DEFAULT 'ACTIVE'
    ) `);
    });
}
exports.createUsersTable = createUsersTable;
function create_new_user(username, password, passcode, role) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `INSERT INTO users (username, password, passcode, role) 
    VALUES (${username}, ${password}, 
        ${passcode}, ${role})`);
        return result;
    });
}
exports.create_new_user = create_new_user;
function get_user(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `SELECT * FROM users WHERE username = ${username}`);
        if ((yield result).rowCount === 0)
            return null;
        return result;
    });
}
exports.get_user = get_user;
function get_passcode(passcode) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        let result = db.query((0, sql_template_strings_1.default) `SELECT * FROM users WHERE passcode = ${passcode}`);
        if ((yield result).rowCount === 0)
            return null;
        return result;
    });
}
exports.get_passcode = get_passcode;
function suspend_user(user, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        const USER = yield db.query((0, sql_template_strings_1.default) `UPDATE users SET status = ${status}  
        WHERE username = ${user}`);
        return USER;
    });
}
exports.suspend_user = suspend_user;
function delete_user(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        const USER = yield db.query((0, sql_template_strings_1.default) ` DELETE FROM users WHERE username = ${user}`);
        return USER;
    });
}
exports.delete_user = delete_user;
