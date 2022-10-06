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
app.use('', require('./routes/credit'));
app.use('', require('./routes/reports'));
app.use('', require('./routes/notiffication'));
//ims 
app.use('/ims', require('./ims/routes/order'));
app.use('/ims', require('./ims/routes/item'));
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
        // await db.query('DROP TABLE orders')
        // await db.query('DROP TABLE tables')
        // await db.query('DROP TABLE credit')
        // await db.query('DROP TABLE notification')
        // await db.query('DROP TABLE item')
        // await db.query('DROP TABLE transactions')
        // 
        // await createUsersTable()
        // await createItemsTable()
        // await createTableManager()
        // await create_Order_Table()
        // await create_credit_table()
        // await create_notifications_table();
        // let i = await db.query(`ALTER TABLE orders 
        //     DROP CONSTRAINT orders_department_item_fkey,
        // 
        //     
        //     ADD CONSTRAINT orders_department_item_fkey FOREIGN KEY (department, item)
        //     REFERENCES item(department, product) ON DELETE NO ACTION ON UPDATE NO ACTION
        //     
        //     
        //     `)
        // console.log(i.rowCount)
        // ims
        // await create_inventory_order_table();
        // await create_transactions_table();
        // let check = await db.query("SELECT * FROM transactions WHERE DATE = CURRENT_DATE")
        // console.log(check.rows)
    });
}
startServer();
// KAMAH GTBank2022
// notificatons to various departments
// retur item for bar man
