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
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('uploads'));
app.use('', require('./routes/item'));
app.use('', require('./routes/user'));
app.use('', require('./routes/order'));
app.use('', require('./routes/table'));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        db.connect((err, client) => {
            if (err)
                return console.error(err.message);
            console.log(`Connected to Database!`);
        });
        // await createUsersTable().then(() => console.log("done creating user table")); 
        // await createItemsTable().then(() => console.log("done creating items tables"));
        // await createTableManager();
        // await create_Order_Table().then(() => console.log("done creating order table"));
        // await db.query(`DROP TABLE orders`)
        // await db.query(`DROP TABLE item`)
        // await db.query(`DROP TABLE tables`)
        // await db.query(`DROP TABLE users`)
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log('Server Listening on port 3000');
        });
    });
}
startServer();
