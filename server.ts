import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import { db } from './connection';
import SQL from 'sql-template-strings'

import { createProductTable} from './models/product';
import { create_Order_Table } from './models/order';
import { createUsersTable } from './models/user';
import { createTableManager} from './models/table';
import { create_credit_table } from './models/credit';
import { create_notifications_table } from './models/notifiacation';

import { create_inventory_order_table } from './ims/models/order';
import { createItemsTable } from './ims/models/item';
import { createDeptTable } from './ims/models/department';
import { create_transactions_table } from './ims/models/transaction';
import { get_all_items } from './ims/models/item';
import { distributeItems } from './ims/resources/item';

import { create_suppliers_table } from './supply_mgt/models/suppliers';
import { create_supply_orders_table } from './supply_mgt/models/s_order';

const app = express();
dotenv.config()

app.use(express.json())
app.use(cors());
app.use(express.static('uploads'));

// POS
app.use('', require('./routes/product'));
app.use('', require('./routes/user'));
app.use('', require('./routes/order'));
app.use('', require('./routes/table'))
app.use('', require('./routes/credit'))
app.use('', require('./routes/reports'))
app.use('', require('./routes/notiffication'))

//IMS
app.use('/ims', require('./ims/routes/order'))
app.use('/ims', require('./ims/routes/item'))
app.use('/ims', require('./ims/routes/department'))
app.use('/ims', require('./ims/routes/transaction'))

// SUPPLY MGT.
app.use('/supply', require('./supply_mgt/routes/s_order'))
app.use('/supply', require('./supply_mgt/routes/suppliers'))

db.connect((err) => {
    if(err) return console.error(err.message)
    console.log(`Connected to Database!`)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
     console.log(`Server Listening on port ${PORT}`)
})

async function startServer() {
   
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

    // await createUsersTable()
    // await createDeptTable()
    // await createItemsTable()
    // await createProductTable()
    // await create_transactions_table()
    // await createTableManager()
    // await create_Order_Table()
    // await create_credit_table()
    // await create_notifications_table();
    // await create_inventory_order_table()

    // await create_suppliers_table()
    // await create_supply_orders_table()

    // console.log((await db.query(`SELECT TO_CHAR(NOW()::date, 'DD MM YYYY ')`)).rows)

    // await db.query(` DELETE FROM orders`)
    // await db.query(` DELETE FROM tables`)
    // await db.query(` DELETE FROM transactions`)
    //console.log(a.rowCount)

    // let d = "Kitchen"
    // let l = "logitunge"
    // let dept = await db.query(SQL ` UPDATE products SET department = 'Lounge' 
    //     WHERE department = ${d}`)
    
    // console.log(dept.rowCount)

    // await db.query(`ALTER TABLE s_orders
    //     DROP COLUMN orderDate
    // `).then(()=> {console.log("cleaned")})

    // let product = await db.query(SQL ` UPDATE item SET quantity = 0 WHERE quantity > 0  `)
    // console.log(product.rowCount)

    // let prod = await db.query(SQL ` UPDATE products SET quantity = 200 WHERE department = 'Lounge'`)
    // console.log(prod.rowCount)


    // await db.query(` DELETE FROM ORDERS `)
    // await db.query(` DELETE FROM tables`)
    // await db.query(` DELETE FROM transactions `)
    
   // let prod =  await db.query(`SELECT * FROM users`)
   // console.log(prod.rows)
   // await db.query(`ALTER TABLE s_orders
   //   ADD COLUMN orderDate TEXT NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP, 'DD-MM-YYYY')
   // `).then(() => { console.log("Done")})

    //  await db.query(`ALTER TABLE suppliers
    //      ADD COLUMN product VARCHAR 
    //  `)
    // console.log((await db.query(`SELECT * from item`)).rows)
}
startServer();
