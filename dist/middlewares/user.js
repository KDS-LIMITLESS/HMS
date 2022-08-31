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
exports.checkIsUserSuspended = exports.authorizeCredit = exports.authorizeDiscount = exports.authorizeAuditor = exports.authorizeSuperAdminNext = exports.authorizeUser = void 0;
const user_1 = require("../models/user");
const credit_1 = require("../models/credit");
function authorizeUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userExists = yield (0, user_1.get_user)(req.body.activeUser);
            if (userExists && (req.body.activePasscode === userExists.rows[0]['passcode'])) {
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
        const USERS = ['Auditor', 'Super Admin', 'Bar Man'];
        try {
            let userExists = yield (0, user_1.get_user)(req.body.activeUser);
            if (userExists && USERS.includes(userExists.rows[0]['role'])
                && (req.body.activePasscode === userExists.rows[0]['passcode'])) {
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
        try {
            let userExists = yield (0, user_1.get_passcode)(req.body.passcode);
            if (req.body.complimentary_qty !== 0 || req.body.discount !== 0) {
                const USERS = ['Auditor', 'Super Admin', 'Admin'];
                if ((userExists === null || userExists === void 0 ? void 0 : userExists.rowCount) === 1 && USERS.includes(userExists === null || userExists === void 0 ? void 0 : userExists.rows[0]['role'])) {
                    next();
                }
                else {
                    console.log(userExists === null || userExists === void 0 ? void 0 : userExists.rows);
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
function authorizeCredit(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.credit !== 0) {
            try {
                const USERS = ['Auditor', 'Super Admin'];
                let userExists = yield (0, user_1.get_passcode)(req.body.passcode);
                const USER_HAS_CREDIT = yield (0, credit_1.get_credit_status)(userExists === null || userExists === void 0 ? void 0 : userExists.rows[0]['username']);
                if (USER_HAS_CREDIT.rows[0]['credit_remaining'] >= req.body.credit) {
                    // subtract credit from credit remaining
                    // console.log(USER_HAS_CREDIT.rows[0]['credit_remaining'] >= req.body.credit)
                    // console.log(USER_HAS_CREDIT.rows[0]['credit_remaining'])
                    let credit_granted = USER_HAS_CREDIT.rows[0]['credit_granted'] + req.body.credit;
                    let remaining_credit = USER_HAS_CREDIT.rows[0]['credit_remaining'] - req.body.credit;
                    yield (0, credit_1.calculate_credit_balance)(userExists === null || userExists === void 0 ? void 0 : userExists.rows[0]['username'], remaining_credit, credit_granted);
                    next();
                }
                else {
                    console.log(req.body);
                    return res.status(401).send(`Credit limit is too low`);
                }
            }
            catch (e) {
                console.log(e.message);
                return res.status(400).send(e.message);
            }
        }
        else {
            next();
        }
    });
}
exports.authorizeCredit = authorizeCredit;
function checkIsUserSuspended(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield (0, user_1.get_user)(req.body.username);
        if ((user === null || user === void 0 ? void 0 : user.rowCount) === 1 && user.rows[0]['status'] === 'SUSPENDED') {
            return res.status(401).send(`You have been suspended!`);
        }
        next();
    });
}
exports.checkIsUserSuspended = checkIsUserSuspended;
