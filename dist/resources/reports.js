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
exports.clearDbDetails = exports.filterIndividualReport = exports.filterOverallReport = exports.generateOverallReport = exports.getItemReports = exports.report = void 0;
const reports_1 = require("../models/reports");
function report(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let waiters = yield (0, reports_1.get_waiters)();
        if (waiters.rowCount > 0)
            return res.status(200).send(waiters.rows);
        return res.status(400).send(` none `);
    });
}
exports.report = report;
function getItemReports(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let items = yield (0, reports_1.get_items)(req.body.waiter);
        if (items.rowCount > 0)
            return res.status(200).send(items.rows);
        return res.status(400).send('none');
    });
}
exports.getItemReports = getItemReports;
function generateOverallReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let items = yield (0, reports_1.get_all_items_sold)();
        if (items.rowCount > 0)
            return res.status(200).send(items.rows);
        return res.status(400).send('None');
    });
}
exports.generateOverallReport = generateOverallReport;
function filterOverallReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        let items = yield (0, reports_1.filter_items)(req.body.from, req.body.to);
        if (items.rowCount > 0)
            return res.status(200).send(items.rows);
        return res.status(400).send('None');
    });
}
exports.filterOverallReport = filterOverallReport;
function filterIndividualReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        let items = yield (0, reports_1.filter_waiter_items)(req.body.waiter, req.body.from, req.body.to);
        console.log(items.rows);
        if (items.rowCount > 0)
            return res.status(200).send(items.rows);
        return res.status(400).send('None');
    });
}
exports.filterIndividualReport = filterIndividualReport;
function clearDbDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const clear = yield (0, reports_1.clear_db)();
        if (clear)
            return res.status(200).send(`Database Wiped!`);
    });
}
exports.clearDbDetails = clearDbDetails;
