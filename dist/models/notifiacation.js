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
exports.get_unread_notification_count = exports.get_waiter_notification = exports.get_notifications = exports.update_notification_status = exports.send_notification = exports.create_notifications_table = void 0;
const connection_1 = require("../connection");
const sql_template_strings_1 = require("sql-template-strings");
function create_notifications_table() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query(`CREATE TABLE IF NOT EXISTS notification(
        id BIGSERIAL PRIMARY KEY,
        waiter VARCHAR REFERENCES users(username) ON DELETE SET NULL,
        item VARCHAR NOT NULL,
        quantity INTEGER NOT NULL,
        status VARCHAR DEFAULT 'UNREAD'
    )`);
    });
}
exports.create_notifications_table = create_notifications_table;
function send_notification(waiter, item, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = yield connection_1.db.query((0, sql_template_strings_1.SQL) ` INSERT INTO notification (waiter, item, quantity)
        VALUES (${waiter}, ${item}, ${quantity})`);
        return query;
    });
}
exports.send_notification = send_notification;
function update_notification_status(status, waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        let message = yield connection_1.db.query((0, sql_template_strings_1.SQL) `UPDATE notification SET status = ${status} 
        WHERE  waiter = ${waiter}`);
        return message;
    });
}
exports.update_notification_status = update_notification_status;
function get_notifications(status, waiter) {
    return __awaiter(this, void 0, void 0, function* () {
        let notification = yield connection_1.db.query((0, sql_template_strings_1.SQL) `SELECT item, quantity FROM notification 
        WHERE status = ${status} AND waiter = ${waiter} `);
        return notification;
    });
}
exports.get_notifications = get_notifications;
function get_waiter_notification(status) {
    return __awaiter(this, void 0, void 0, function* () {
        let waiter = yield connection_1.db.query((0, sql_template_strings_1.SQL) `SELECT DISTINCT waiter FROM notification 
        WHERE STATUS = ${status}`);
        return waiter;
    });
}
exports.get_waiter_notification = get_waiter_notification;
function get_unread_notification_count(status) {
    return __awaiter(this, void 0, void 0, function* () {
        let count = yield connection_1.db.query((0, sql_template_strings_1.SQL) `SELECT waiter, item, status FROM notification 
        WHERE status = ${status}`);
        return count;
    });
}
exports.get_unread_notification_count = get_unread_notification_count;
