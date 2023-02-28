"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_1 = require("../resources/notification");
const router = express_1.default.Router();
router.get('/waiters', notification_1.waiters);
router.get('/notification-count', notification_1.notificationCount);
router.post('/notification', notification_1.notifications);
router.put('/update-notification', notification_1.updateNotificationStatus);
module.exports = router;
