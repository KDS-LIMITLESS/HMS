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
exports.updateUserPasscode = exports.updateUserPassword = exports.getAllAuthorizedAdmins = exports.updateUserRole = exports.getAllUsers = exports.removeUser = exports.reactivateUser = exports.suspendUser = exports.checkPasscode = exports.login = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const user_2 = require("../middlewares/user");
const token = new user_2.Tokens();
function newUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userExists = yield (0, user_1.get_user)(req.body.username);
        if (userExists.rowCount === 1)
            return res.status(400).send(`User ${req.body.username} already exists.`);
        try {
            const PSW = yield bcrypt_1.default.hash(req.body.password, 12);
            const username = req.body['username'].trim().strip();
            console.log(username);
            yield (0, user_1.create_new_user)(username, PSW, req.body.passcode, req.body.role);
            return res.status(200).json({ success: `User created successfully!` });
        }
        catch (err) {
            console.error(err);
            return res.status(500).send('An error occured!');
        }
    });
}
exports.newUser = newUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userExists = yield (0, user_1.get_user)(req.body.username);
        if ((userExists.rowCount === 1) && (yield bcrypt_1.default.compare(req.body.password, userExists.rows[0]['password']))) {
            let user = yield token.generateAuthToken(userExists.rows[0]['username'], userExists.rows[0]['role'], userExists.rows[0]['passcode']);
            console.log(user);
            return res.status(200).json({ username: userExists.rows[0]['username'],
                passcode: userExists.rows[0]['passcode'], role: userExists.rows[0]['role'], token: user });
            // return res.status(200).json({token: user }); 
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
            if ((userExists.rowCount === 1) && (userExists.rows[0]['role'] === 'Super Admin' || userExists.rows[0]['role'] === 'Accounts') && (req.body.passcode === userExists.rows[0]['passcode'])) {
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
        if (findUser.rowCount === 1) {
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
function getAllAuthorizedAdmins(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let users = yield (0, user_1.get_admins)();
        if (users) {
            return res.status(200).send(users.rows);
        }
        return res.status(404).send(`Not Found!`);
    });
}
exports.getAllAuthorizedAdmins = getAllAuthorizedAdmins;
function updateUserPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let findUser = yield (0, user_1.get_user)(req.body.username);
        if (findUser.rowCount === 1) {
            const PSW = yield bcrypt_1.default.hash(req.body.password, 12);
            console.log(PSW);
            yield (0, user_1.update_user_password)(req.body.username, PSW);
            return res.status(200).send(`USER UPDATED`);
        }
        return res.status(404).send(`USER NOT FOUND IN DATABASE`);
    });
}
exports.updateUserPassword = updateUserPassword;
function updateUserPasscode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let findUser = yield (0, user_1.get_user)(req.body.username);
        if (findUser.rowCount === 1) {
            yield (0, user_1.update_user_passcode)(req.body.username, req.body.passcode);
            return res.status(200).send(`USER UPDATED`);
        }
        return res.status(404).send(`USER NOT FOUND IN DATABASE`);
    });
}
exports.updateUserPasscode = updateUserPasscode;
