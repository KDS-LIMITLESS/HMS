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
exports.getDepartments = exports.createDepartment = void 0;
const department_1 = require("../models/department");
function createDepartment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const dept = yield (0, department_1.create_dept)(req.body.department);
        return res.status(200).send("OK");
    });
}
exports.createDepartment = createDepartment;
function getDepartments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let dept = yield (0, department_1.get_departments)();
        return res.status(200).send(dept.rows);
    });
}
exports.getDepartments = getDepartments;
