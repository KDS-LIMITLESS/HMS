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
exports.filterDate = exports.getTotalPlacedOrders = exports.getAllReturnedOrders = exports.getAllDamagedOrders = exports.getAllCancelledOrders = exports.getAllReceivedOrders = exports.getAllPlacedOrders = exports.cancelSupplyOrder = exports.receiveSupplyOrder = exports.returnSupplyOrder = exports.damagedSupplyOrder = exports.placeSupplyOrder = void 0;
const suppliers_1 = require("../models/suppliers");
const s_order_1 = require("../models/s_order");
function placeSupplyOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        let findSupplier = yield (0, suppliers_1.find_supplier)(body['supplierName']);
        console.log(findSupplier.rows);
        if (findSupplier.rowCount >= 1) {
            let order = yield (0, s_order_1.place_supply_order)(body['item'], body['quantity'], body['size'], body['unitPrice'], body['measure'], body['supplierName'], body['total_price'], "PENDING");
            return res.status(200).json({ message: "Supply order sent", data: order.rows });
        }
        return res.status(400).json({ message: "Supplier not found in database" });
    });
}
exports.placeSupplyOrder = placeSupplyOrder;
function damagedSupplyOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        let findSupplier = yield (0, suppliers_1.find_supplier)(body['supplierName']);
        console.log(findSupplier.rows);
        if (findSupplier.rowCount >= 1) {
            let order = yield (0, s_order_1.place_supply_order)(body['item'], body['quantity'], body['size'], body['unitPrice'], body['measure'], body['supplierName'], body['total_price'], "DAMAGED");
            return res.status(200).json({ message: "Supply order sent", data: order.rows });
        }
        return res.status(400).json({ message: "Supplier not found in database" });
    });
}
exports.damagedSupplyOrder = damagedSupplyOrder;
function returnSupplyOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        let findSupplier = yield (0, suppliers_1.find_supplier)(body['supplierName']);
        console.log(findSupplier.rows);
        if (findSupplier.rowCount >= 1) {
            let order = yield (0, s_order_1.place_supply_order)(body['item'], body['quantity'], body['size'], body['unitPrice'], body['measure'], body['supplierName'], body['total_price'], "RETURNED");
            return res.status(200).json({ message: "Supply order sent", data: order.rows });
        }
        return res.status(400).json({ message: "Supplier not found in database" });
    });
}
exports.returnSupplyOrder = returnSupplyOrder;
function receiveSupplyOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let body = req.body;
        let getOrder = yield (0, s_order_1.get_order)(body['supplier'], body['item'], "PENDING");
        if (getOrder.rowCount >= 1) {
            let update = yield (0, s_order_1.receive_supply_order)(body['supplier'], body['item']);
            return res.status(200).json({ message: "Supply updated", data: update.rows });
        }
        return res.status(400).json({ message: "Supply details not found in database" });
    });
}
exports.receiveSupplyOrder = receiveSupplyOrder;
function cancelSupplyOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let body = req.body;
        let getOrder = yield (0, s_order_1.get_order)(body['supplier'], body['item'], "PENDING");
        if (getOrder.rowCount >= 1) {
            let update = yield (0, s_order_1.cancel_supply_order)(body['supplier'], body['item']);
            return res.status(200).json({ message: "Supply updated", data: update.rows });
        }
        return res.status(400).json({ message: "Supply details not found in database" });
    });
}
exports.cancelSupplyOrder = cancelSupplyOrder;
function getAllPlacedOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield (0, s_order_1.get_all_placed_order)(req.body.supplier);
        if (orders.rowCount >= 1)
            return res.status(200).json({ data: orders.rows });
        return res.status(400).json({ message: "Not found" });
    });
}
exports.getAllPlacedOrders = getAllPlacedOrders;
function getAllReceivedOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield (0, s_order_1.get_all_received_orders)(req.body.supplier);
        if (orders.rowCount >= 1)
            return res.status(200).json({ data: orders.rows });
        return res.status(400).json({ message: "Not found" });
    });
}
exports.getAllReceivedOrders = getAllReceivedOrders;
function getAllCancelledOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield (0, s_order_1.get_all_cancelled_orders)(req.body.supplier);
        if (orders.rowCount >= 1)
            return res.status(200).json({ data: orders.rows });
        return res.status(400).json({ message: "Not found" });
    });
}
exports.getAllCancelledOrders = getAllCancelledOrders;
function getAllDamagedOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield (0, s_order_1.get_all_damaged_orders)(req.body.supplier);
        if (orders.rowCount >= 1)
            return res.status(200).json({ data: orders.rows });
        return res.status(400).json({ message: "Not found" });
    });
}
exports.getAllDamagedOrders = getAllDamagedOrders;
function getAllReturnedOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield (0, s_order_1.get_all_damaged_orders)(req.body.supplier);
        if (orders.rowCount >= 1)
            return res.status(200).json({ data: orders.rows });
        return res.status(400).json({ message: "Not found" });
    });
}
exports.getAllReturnedOrders = getAllReturnedOrders;
function getTotalPlacedOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const total = yield (0, s_order_1.get_total)(req.body.supplier);
        console.log(total);
        return res.status(200).json({ data: total.rows });
    });
}
exports.getTotalPlacedOrders = getTotalPlacedOrders;
function filterDate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let date = yield (0, s_order_1.get_date)(req.body.from, req.body.to);
        console.log(req.body);
        if (date)
            return res.status(200).json({ filters: date.rows, count: date.rowCount });
        return res.status(400).send("Transactions within the specified date does not exist");
    });
}
exports.filterDate = filterDate;
