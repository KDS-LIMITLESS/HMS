"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const reports_1 = require("../resources/reports");
exports.router = express_1.default.Router();
exports.router.get('/waiter-reports', reports_1.report);
exports.router.post('/sold-items', reports_1.getItemReports);
exports.router.get('/overall-reports', reports_1.generateOverallReport);
module.exports = exports.router;
// i am me this cool igbo guy abu m onye igbo and as you can see a na m asu igbo 
// buh for now ka m were ya n oyibo... 
// so i dey huzzle my daily 2k usual 0% fraud etc..
