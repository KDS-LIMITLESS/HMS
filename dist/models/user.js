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
exports.update_user_passcode = exports.update_user_password = exports.update_user_role = exports.delete_user = exports.suspend_user = exports.get_passcode = exports.get_all_users = exports.get_admins = exports.get_admin_user = exports.get_user = exports.create_new_user = exports.createUsersTable = void 0;
const connection_1 = require("../connection");
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        connection_1.db.query(` CREATE TABLE IF NOT EXISTS users (
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
        let result = connection_1.db.query((0, sql_template_strings_1.default) `INSERT INTO users (username, password, passcode, role) 
    VALUES (${username}, ${password}, 
        ${passcode}, ${role})`);
        return result;
    });
}
exports.create_new_user = create_new_user;
function get_user(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT * FROM users WHERE username = ${username}`);
        // if ((await result).rowCount === 0) return null;
        return result;
    });
}
exports.get_user = get_user;
function get_admin_user(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let role = yield connection_1.db.query((0, sql_template_strings_1.default) `SELECT role FROM users WHERE username = ${user}`);
        return role;
    });
}
exports.get_admin_user = get_admin_user;
function get_admins() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield connection_1.db.query(`SELECT * FROM USERS WHERE role = 'Admin' 
        OR role = 'Super Admin' OR role = 'Auditor' `);
        return result;
    });
}
exports.get_admins = get_admins;
function get_all_users() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = connection_1.db.query((0, sql_template_strings_1.default) `SELECT * FROM users `);
        return result;
    });
}
exports.get_all_users = get_all_users;
function get_passcode(passcode) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = connection_1.db.query((0, sql_template_strings_1.default) `SELECT * FROM users WHERE passcode = ${passcode}`);
        if ((yield result).rowCount === 0)
            return null;
        return result;
    });
}
exports.get_passcode = get_passcode;
function suspend_user(user, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const USER = yield connection_1.db.query((0, sql_template_strings_1.default) `UPDATE users SET status = ${status}  
        WHERE username = ${user}`);
        return USER;
    });
}
exports.suspend_user = suspend_user;
function delete_user(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const USER = yield connection_1.db.query((0, sql_template_strings_1.default) `DELETE FROM users WHERE username = ${user}`);
        return USER;
    });
}
exports.delete_user = delete_user;
function update_user_role(user, role) {
    return __awaiter(this, void 0, void 0, function* () {
        const USER = yield connection_1.db.query((0, sql_template_strings_1.default) `UPDATE users SET role = ${role} WHERE username = ${user}`);
        return USER;
    });
}
exports.update_user_role = update_user_role;
function update_user_password(user, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const USER = yield connection_1.db.query((0, sql_template_strings_1.default) `UPDATE users SET password = ${password} WHERE username = ${user}`);
        return USER;
    });
}
exports.update_user_password = update_user_password;
function update_user_passcode(user, passcode) {
    return __awaiter(this, void 0, void 0, function* () {
        const USER = yield connection_1.db.query((0, sql_template_strings_1.default) `UPDATE users SET passcode = ${passcode} WHERE username = ${user}`);
        return USER;
    });
}
exports.update_user_passcode = update_user_passcode;
