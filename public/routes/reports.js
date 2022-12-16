"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const reports_1 = require("../resources/reports");
const imageloader_1 = require("../middlewares/imageloader");
exports.router = express_1.default.Router();
exports.router.get('/waiter-reports', reports_1.report);
exports.router.post('/individual-report', reports_1.getItemReports);
exports.router.post('/filter-individual-report', reports_1.filterIndividualReport);
exports.router.get('/overall-reports', reports_1.generateOverallReport);
exports.router.post('/filter-reports', reports_1.filterOverallReport);
exports.router.post('/upload-report', imageloader_1.uploadReportFile);
exports.router.post('/retrieve-pdf', imageloader_1.retrievePDF);
// router.delete('/clear-db', authorizeSuperAdminNext, clearDbDetails)
module.exports = exports.router;
