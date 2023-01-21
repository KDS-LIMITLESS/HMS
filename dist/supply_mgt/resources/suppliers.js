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
exports.getSupplierDetails = exports.newSupplier = void 0;
const suppliers_1 = require("../models/suppliers");
function newSupplier(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const isSupplier = yield (0, suppliers_1.find_supplier)(req.body.supplier_name);
        if (isSupplier)
            return res.status(400).json({ message: `Supplier already exists.` });
        let create_supplier = yield (0, suppliers_1.new_supplier)(body['supplier_name'], body['email'], body['phone'], body['gender'], body['address']);
        return res.status(200).json({ message: "New Supplier added", data: create_supplier });
    });
}
exports.newSupplier = newSupplier;
function getSupplierDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const getSupplier = yield (0, suppliers_1.find_supplier)(req.body.supplier_name);
        if (getSupplier)
            return res.status(200).json({ data: getSupplier });
        return res.status(400).json({ message: "supplier does not exist" });
    });
}
exports.getSupplierDetails = getSupplierDetails;
