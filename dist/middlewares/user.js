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
exports.authorizeDiscount = exports.authorizeAuditor = exports.authorizeSuperAdminNext = exports.authorizeUser = void 0;
const user_1 = require("../models/user");
function authorizeUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userExists = yield (0, user_1.get_user)(req.body.activeUser);
            if (userExists && (req.body.activePasscode === userExists.rows[0]['passcode'])) {
                console.log(`calling next done...`);
                next();
            }
            else {
                console.log(JSON.stringify(req.body) + " Error from authorize User");
                return res.status(400).send("Please login to continue");
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("An error Occured!");
        }
    });
}
exports.authorizeUser = authorizeUser;
function authorizeSuperAdminNext(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
function authorizeAuditor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userExists = yield (0, user_1.get_user)(req.body.activeUser);
            if (userExists && (userExists.rows[0]['role'] === 'Auditor' || userExists.rows[0]['role'] === 'Super Admin')
                && (req.body.activePasscode === userExists.rows[0]['passcode'])) {
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
exports.authorizeAuditor = authorizeAuditor;
function authorizeDiscount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const USERS = ['Auditor', 'Super Admin', 'Admin'];
        try {
            let userExists = yield (0, user_1.get_passcode)(req.body.passcode);
            if (req.body.credit !== 0 || req.body.complimentary_qty !== 0 || req.body.discount !== 0) {
                if ((userExists === null || userExists === void 0 ? void 0 : userExists.rowCount) === 1 && USERS.includes(userExists.rows[0]['role'])) {
                    next();
                }
                else {
                    console.log(req.body);
                    return res.status(401).send(`Not Authorized`);
                }
            }
            else {
                console.log('finally');
                next();
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).send("An error Occured!");
        }
    });
}
exports.authorizeDiscount = authorizeDiscount;
