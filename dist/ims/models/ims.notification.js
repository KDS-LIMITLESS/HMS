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
exports.new_notification = exports.create_notifications_table = void 0;
const connection_1 = require("../../connection");
function create_notifications_table() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.db.query(`CREATE TABLE IF NOT EXISTS notificationMSG(
        id BIGSERIAL PRIMARY KEY,
        notification TEXT
    )`);
    });
}
exports.create_notifications_table = create_notifications_table;
function new_notification(notification) {
    return __awaiter(this, void 0, void 0, function* () {
        let text = yield connection_1.db.query(`INSERT INTO notificationMSG(notification)
        VALUES (${notification});`);
        return text;
    });
}
exports.new_notification = new_notification;
