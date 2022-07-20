"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../resources/user");
const user_2 = require("../middlewares/user");
exports.router = express_1.default.Router();
exports.router.get('/users', user_1.getAllUsers);
exports.router.post('/new-user', user_1.newUser);
exports.router.post('/add-user', user_2.authorizeSuperAdminNext, user_1.newUser);
exports.router.post('/login', user_2.checkIsUserSuspended, user_1.login);
exports.router.post('/check-passcode', user_1.checkPasscode);
exports.router.delete('/delete-user', user_2.authorizeAuditor, user_1.removeUser);
exports.router.put('/suspend-user', user_2.authorizeAuditor, user_1.suspendUser);
exports.router.put('/reactivate', user_2.authorizeAuditor, user_1.reactivateUser);
module.exports = exports.router;
