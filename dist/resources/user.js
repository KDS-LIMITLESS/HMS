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
exports.grantAdminCredit = exports.updateUserRole = exports.getAllUsers = exports.removeUser = exports.reactivateUser = exports.suspendUser = exports.checkPasscode = exports.login = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
function newUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userExists = yield (0, user_1.get_user)(req.body.username);
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
            return res.status(200).json({ username: userExists.rows[0]['username'],
                passcode: userExists.rows[0]['passcode'], role: userExists.rows[0]['role'] });
        }
        console.log(JSON.stringify(req.body) + " Invalid login details");
        return res.status(400).send(`Invalid login details`);
    });
}
exports.login = login;
function checkPasscode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userExists = yield (0, user_1.get_user)(req.body.username);
        try {
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
function suspendUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let findUser = yield (0, user_1.get_user)(req.body.username);
        if ((findUser === null || findUser === void 0 ? void 0 : findUser.rowCount) === 1) {
            yield (0, user_1.suspend_user)(req.body.username, "SUSPENDED");
            return res.status(200).send(`USER SUSPENDED!`);
        }
        return res.status(404).send(`User Not Found`);
    });
}
exports.suspendUser = suspendUser;
function reactivateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let findUser = yield (0, user_1.get_user)(req.body.username);
        if ((findUser === null || findUser === void 0 ? void 0 : findUser.rowCount) === 1) {
            yield (0, user_1.suspend_user)(req.body.username, "ACTIVE");
            return res.status(200).send(`USER RE-ACTIVATED`);
        }
        return res.status(404).send(`USER NOT FOUND!`);
    });
}
exports.reactivateUser = reactivateUser;
function removeUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let findUser = yield (0, user_1.get_user)(req.body.username);
        if ((findUser === null || findUser === void 0 ? void 0 : findUser.rowCount) === 1) {
            yield (0, user_1.delete_user)(req.body.username);
            return res.status(200).send(`USER DELETED`);
        }
        return res.status(404).send(`USER NOT FOUND!`);
    });
}
exports.removeUser = removeUser;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield (0, user_1.get_all_users)();
        if (user.rowCount === 0) {
            return res.status(404).send(`Empty`);
        }
        return res.status(200).send(user.rows);
    });
}
exports.getAllUsers = getAllUsers;
function updateUserRole(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let findUser = yield (0, user_1.get_user)(req.body.username);
        if ((findUser === null || findUser === void 0 ? void 0 : findUser.rowCount) === 1) {
            yield (0, user_1.update_user_role)(req.body.username, req.body.role);
            return res.status(200).send(`USER UPDATED`);
        }
        return res.status(404).send(`USER NOT FOUND IN DATABASE`);
    });
}
exports.updateUserRole = updateUserRole;
function grantAdminCredit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.grantAdminCredit = grantAdminCredit;
