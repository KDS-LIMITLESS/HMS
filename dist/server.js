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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("./connection");
const order_1 = require("./models/order");
const table_1 = require("./models/table");
const notifiacation_1 = require("./models/notifiacation");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('uploads'));
app.use('', require('./routes/item'));
app.use('', require('./routes/user'));
app.use('', require('./routes/order'));
app.use('', require('./routes/table'));
app.use('', require('./routes/credit'));
app.use('', require('./routes/reports'));
app.use('', require('./routes/notiffication'));
connection_1.db.connect((err) => {
    if (err)
        return console.error(err.message);
    console.log(`Connected to Database!`);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server Listening on port 3000');
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, table_1.createTableManager)();
        yield (0, notifiacation_1.create_notifications_table)();
        yield (0, order_1.create_Order_Table)();
    });
}
startServer();
