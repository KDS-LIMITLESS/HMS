import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import { db } from './connection';
import { createItemsTable } from './models/item';
import { create_Order_Table } from './models/order';
import { createUsersTable } from './models/user';
import { createTableManager} from './models/table';
import { create_credit_table } from './models/credit';
import { create_notifications_table } from './models/notifiacation';
import { create_inventory_order_table } from './ims/models/order';
import { createProductTable } from './ims/models/item';
import { createDeptTable } from './ims/models/department';

import SQL from 'sql-template-strings'

const app = express();
dotenv.config()

app.use(express.json())
app.use(cors());
app.use(express.static('uploads'));
app.use('', require('./routes/item'));
app.use('', require('./routes/user'));
app.use('', require('./routes/order'));
app.use('', require('./routes/table'))
app.use('', require('./routes/credit'))
app.use('', require('./routes/reports'))
app.use('', require('./routes/notiffication'))

//ims 

app.use('/ims', require('./ims/routes/order'))
app.use('/ims', require('./ims/routes/item'))
app.use('/ims', require('./ims/routes/department'))


db.connect((err) => {
    if(err) return console.error(err.message)
    console.log(`Connected to Database!`)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
     console.log('Server Listening on port 3000')
})

async function startServer() {
   
    // await db.query('DROP TABLE orders')
    // await db.query('DROP TABLE tables')
    // await db.query('DROP TABLE credit')
    // await db.query('DROP TABLE notification')
    // put products table here
    // await db.query('DROP TABLE catalogue ')
    // await db.query('DROP TABLE transactions')
    // put item table here
    // await db.query('DROP TABLE dept ')
    // await db.query('DROP TABLE users')
    
    

    // await createUsersTable()
    // await createDeptTable()
    // await createItemsTable()
    // await createProductTable()
    
    // await createTableManager()
    // await create_Order_Table()
    // await create_credit_table()
    // await create_notifications_table();
    //await create_inventory_order_table()
    //let a = await db.query(` DELETE FROM catalogue WHERE product = 'null' `)
    //console.log(a.rowCount)

    // let d = "Kitchen"
    // let l = "lounge"
    // let dept = await db.query(SQL ` UPDATE products SET department = 'Lounge' 
    //     WHERE department = ${d}`)
    
    // console.log(dept.rowCount)

    // await db.query(`ALTER TABLE products
    //     DROP CONSTRAINT products_product_fkey CASCADE,
    //     ADD CONSTRAINT products_product_fkey FOREIGN KEY (product) REFERENCES item(product) ON DELETE CASCADE ON UPDATE CASCADE
    //  `)
    
   // let prod =  await db.query(`SELECT * FROM users`)
   // console.log(prod.rows)
    // await db.query(`ALTER TABLE products
    //     ADD COLUMN category VARCHAR NOT NULL
 // `)

}
startServer();

// api for deleting item from ims

// check update ordr status on ims
// Database reordring
// make seprate table for image 
// automate adding items to deps when order status chages to RECEIVED 
// quantity, image, reorderlevel

// Seprate closed and open tables, push to a side of the screen
// change items to products like Ada said 
// Apis for the cards in IMS and POS