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
exports.login = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
function newUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userExists = yield (0, user_1.get_user)(req.body.username);
        // console.log(userExists?.rows[0]['username'])
        if (userExists)
            return res.status(400).send(`User ${req.body.username} already exists.`);
        try {
            const PSW = yield bcrypt_1.default.hash(req.body.password, 12);
            yield (0, user_1.create_new_user)(req.body.username, PSW, req.body.passcode, req.body.role);
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
        const PSW = bcrypt_1.default.compare(req.body.password, userExists === null || userExists === void 0 ? void 0 : userExists.rows[0]['password']);
        if (userExists && (yield PSW)) {
            return res.status(200).send(userExists.rows[0]);
        }
        console.log(JSON.stringify(req.body) + " Invalid login details");
        return res.status(400).send(`Invalid login details`);
    });
}
exports.login = login;
