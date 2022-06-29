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
exports.login = exports.newUser = void 0;
const user_1 = require("../models/user");
function newUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userExists = yield (0, user_1.get_user)(req.body.username);
        console.log(userExists === null || userExists === void 0 ? void 0 : userExists.rows[0]['username']);
        if (userExists)
            return res.status(400).send(`User ${req.body.username} already exists.`);
        try {
            yield (0, user_1.create_new_user)(req.body.username, req.body.password);
            return res.status(200).json({ success: `User created successfully!` });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send('An error occured!');
        }
    });
}
exports.newUser = newUser;
;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userExists = yield (0, user_1.get_user)(req.body.username);
        if (userExists && (userExists.rows[0]['password'] === req.body.password)) {
            return res.status(200).send(userExists.rows[0]);
        }
        console.log(req.body + "Invalid login details");
        return res.status(400).send(`Invalid login details`);
    });
}
exports.login = login;
