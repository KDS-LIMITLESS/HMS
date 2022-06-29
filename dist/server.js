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
const connection_1 = require("./connection");
const user_1 = require("./models/user");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('', require('./routes/item'));
app.use('', require('./routes/user'));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, connection_1.dbConnection)();
        db.connect((err, client) => {
            if (err)
                return console.error(err.message);
            console.log(`Connected to Database!`);
        });
        //await createItemsTable();
        //await createOrderTable();
        yield (0, user_1.createUsersTable)();
        //await db.query(`DROP TABLE ordert`)
        app.listen(3000, () => {
            console.log('Server Listening on port 3000');
        });
    });
}
startServer();
