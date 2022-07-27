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
exports.UserCreditStatus = exports.getcreditStatus = exports.grantStaffCredit = void 0;
const credit_1 = require("../models/credit");
function grantStaffCredit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //  const ROLES = ['Admin', 'Super Admin', 'Auditor']
        //  const isUserAdmin = await get_admin_user(req.body.activeUser)
        //  console.log(isUserAdmin.rows)
        //  
        //  if (isUserAdmin.rows[0]['role'] != ROLES.includes(isUserAdmin.rows[0]['role'])){
        //      return res.status(200).send(`Who are You?`)
        //  }
        const CREDIT_STATUS = yield (0, credit_1.get_credit_status)(req.body.username);
        let creditRemaining;
        if (CREDIT_STATUS.rowCount === 1) {
            req.body.opening_credit += CREDIT_STATUS.rows[0]['opening_credit'];
            creditRemaining = req.body.opening_credit - CREDIT_STATUS.rows[0]['credit_granted'];
            yield (0, credit_1.update_credit_status)(req.body.username, req.body.opening_credit, creditRemaining);
            return res.status(200).send(`OK`);
        }
        creditRemaining = req.body.opening_credit;
        yield (0, credit_1.grant_credit)(req.body.username, req.body.opening_credit, creditRemaining);
        return res.status(200).send(`DONE`);
    });
}
exports.grantStaffCredit = grantStaffCredit;
function getcreditStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let users = yield (0, credit_1.get_admin_users)();
        if (users.rowCount >= 1) {
            return res.status(200).send(users.rows);
        }
        return res.status(404).send(`Not Found!`);
    });
}
exports.getcreditStatus = getcreditStatus;
function UserCreditStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield (0, credit_1.get_credit_status)(req.body.activeUser);
        if (user.rowCount >= 1) {
            return res.status(200).json({
                credit_remaining: user.rows[0]['credit_remaining'],
                opening_credit: user.rows[0]['opening_credit'],
                credit_granted: user.rows[0]['credit_granted']
            });
        }
        return res.status(400).send(`Null`);
    });
}
exports.UserCreditStatus = UserCreditStatus;
