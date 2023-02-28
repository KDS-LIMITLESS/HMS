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
exports.notificationCount = exports.updateNotificationStatus = exports.waiters = exports.notifications = void 0;
const notifiacation_1 = require("../models/notifiacation");
function notifications(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let notification = yield (0, notifiacation_1.get_notifications)('UNREAD', req.body.waiter);
        if (notification.rowCount > 0)
            return res.status(200).send(notification.rows);
        return res.status(400).send(`None`);
    });
}
exports.notifications = notifications;
// list of all waiters names that placed orders
function waiters(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let waiter = yield (0, notifiacation_1.get_waiter_notification)("UNREAD");
        if (waiter.rowCount > 0)
            return res.status(200).send(waiter.rows);
        return res.status(400).send(`none`);
    });
}
exports.waiters = waiters;
function updateNotificationStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let isWaiter = yield (0, notifiacation_1.update_notification_status)("READ", req.body.waiter);
        if (isWaiter.rowCount === 0)
            return res.status(404).send(`No such user`);
        return res.status(200).send(`OK`);
    });
}
exports.updateNotificationStatus = updateNotificationStatus;
function notificationCount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let count = yield (0, notifiacation_1.get_unread_notification_count)("UNREAD");
        if (count.rowCount > 0)
            return res.status(200).send(count.rows);
        res.status(400).send(`none`);
    });
}
exports.notificationCount = notificationCount;
