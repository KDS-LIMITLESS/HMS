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
exports.get_departments = exports.create_dept = exports.createDeptTable = void 0;
const connection_1 = require("../../connection");
const sql_template_strings_1 = __importDefault(require("sql-template-strings"));
function createDeptTable() {
    return __awaiter(this, void 0, void 0, function* () {
        connection_1.db.query(`CREATE TABLE IF NOT EXISTS 
    dept(
        department VARCHAR PRIMARY KEY NOT NULL
    )`, (err, result) => {
            if (err)
                return console.error(err.message);
            return result;
        });
    });
}
exports.createDeptTable = createDeptTable;
function create_dept(dept) {
    return __awaiter(this, void 0, void 0, function* () {
        let department = yield connection_1.db.query((0, sql_template_strings_1.default) ` INSERT INTO dept(department)
        VALUES(${dept});`);
    });
}
exports.create_dept = create_dept;
function get_departments() {
    return __awaiter(this, void 0, void 0, function* () {
        const dept = connection_1.db.query((0, sql_template_strings_1.default) ` SELECT department from dept `);
        return dept;
    });
}
exports.get_departments = get_departments;
