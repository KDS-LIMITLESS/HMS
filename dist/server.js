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
const product_1 = require("./models/product");
const order_1 = require("./models/order");
const user_1 = require("./models/user");
const table_1 = require("./models/table");
const credit_1 = require("./models/credit");
const notifiacation_1 = require("./models/notifiacation");
const order_2 = require("./ims/models/order");
const item_1 = require("./ims/models/item");
const department_1 = require("./ims/models/department");
const transaction_1 = require("./ims/models/transaction");
const suppliers_1 = require("./supply_mgt/models/suppliers");
const s_order_1 = require("./supply_mgt/models/s_order");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.static('uploads'));
// POS
app.use('', require('./routes/product'));
app.use('', require('./routes/user'));
app.use('', require('./routes/order'));
app.use('', require('./routes/table'));
app.use('', require('./routes/credit'));
app.use('', require('./routes/reports'));
app.use('', require('./routes/notiffication'));
//IMS
app.use('/ims', require('./ims/routes/order'));
app.use('/ims', require('./ims/routes/item'));
app.use('/ims', require('./ims/routes/department'));
app.use('/ims', require('./ims/routes/transaction'));
// SUPPLY MGT.
app.use('/supply', require('./supply_mgt/routes/s_order'));
app.use('/supply', require('./supply_mgt/routes/suppliers'));
connection_1.db.connect((err) => {
    if (err)
        return console.error(err.message);
    console.log(`Connected to Database!`);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // await db.query('DROP TABLE orders')
        // await db.query('DROP TABLE tables')
        // await db.query('DROP TABLE credit')
        // await db.query('DROP TABLE notification')
        // await db.query(`DROP TABLE products`)
        // await db.query('DROP TABLE catalogue ')
        // await db.query('DROP TABLE transactions')
        // await db.query(`DROP TABLE item`)
        // await db.query('DROP TABLE dept ')
        // await db.query('DROP TABLE users')
        yield (0, user_1.createUsersTable)();
        yield (0, department_1.createDeptTable)();
        yield (0, item_1.createItemsTable)();
        yield (0, product_1.createProductTable)();
        yield (0, transaction_1.create_transactions_table)();
        yield (0, table_1.createTableManager)();
        yield (0, order_1.create_Order_Table)();
        yield (0, credit_1.create_credit_table)();
        yield (0, notifiacation_1.create_notifications_table)();
        yield (0, order_2.create_inventory_order_table)();
        yield (0, suppliers_1.create_suppliers_table)();
        yield (0, s_order_1.create_supply_orders_table)();
        // await db.query(` DELETE FROM orders`)
        // await db.query(` DELETE FROM tables`)
        // await db.query(` DELETE FROM transactions`)
        //console.log(a.rowCount)
        // let d = "Kitchen"
        // let l = "logitunge"
        // let dept = await db.query(SQL ` UPDATE products SET department = 'Lounge' 
        //     WHERE department = ${d}`)
        // console.log(dept.rowCount)
        // await db.query(`ALTER TABLE item
        //     DROP CONSTRAINT item_quantity_key
        // `)
        // let product = await db.query(SQL ` UPDATE item SET quantity = 0 WHERE quantity > 0  `)
        // console.log(product.rowCount)
        // let prod = await db.query(SQL ` UPDATE products SET quantity = 200 WHERE department = 'Lounge'`)
        // console.log(prod.rowCount)
        // await db.query(` DELETE FROM ORDERS `)
        // await db.query(` DELETE FROM tables`)
        // await db.query(` DELETE FROM transactions `)
        // let prod =  await db.query(`SELECT * FROM users`)
        // console.log(prod.rows)
        // await db.query(`ALTER TABLE item
        //     ADD COLUMN deleted_status VARCHAR DEFAULT 'FALSE'
        // `)
        yield connection_1.db.query(`ALTER TABLE suppliers
         ADD COLUMN product VARCHAR 
     `);
        // console.log((await db.query(`SELECT * from item`)).rows)
    });
}
startServer();
