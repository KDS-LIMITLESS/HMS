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
exports.authorizeSuperAdminNext = exports.checkPasscode = exports.authorizeUser = void 0;
const user_1 = require("../models/user");
function authorizeUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        if (user in req) {
            try {
                let userExists = yield (0, user_1.get_user)(user['username']);
                if (userExists && (req.body.passcode === (userExists === null || userExists === void 0 ? void 0 : userExists.rows[0]['passcode']))) {
                    next();
                }
            }
            catch (err) {
                console.log(err);
                return res.status(500).send("An error Occured!");
            }
        }
        return res.status(400).send("Please login to continue");
    });
}
exports.authorizeUser = authorizeUser;
function checkPasscode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //let user: any
        try {
            let userExists = yield (0, user_1.get_user)(req.body.username);
            if (userExists && (userExists.rows[0]['role'] === 'Super Admin') && (req.body.passcode === userExists.rows[0]['passcode'])) {
                return res.status(200).send("OK");
            }
            console.log(JSON.stringify(req.body));
            return res.status(400).send("Please login to continue");
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("An error Occured!");
        }
    });
}
exports.checkPasscode = checkPasscode;
function authorizeSuperAdminNext(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //let user: any
        try {
            let userExists = yield (0, user_1.get_user)(req.body.activeUser);
            if (userExists && (userExists.rows[0]['role'] === 'Super Admin') && (req.body.activePasscode === userExists.rows[0]['passcode'])) {
                console.log("calling Next");
                next();
            }
            else {
                console.log(req.body);
                return res.status(400).send("Please login to continue");
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("An error Occured!");
        }
    });
}
exports.authorizeSuperAdminNext = authorizeSuperAdminNext;
