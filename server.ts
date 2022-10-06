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
import { create_transactions_table } from './ims/models/item';
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
    // await db.query('DROP TABLE item')
    // await db.query('DROP TABLE transactions')
    // 
    // await createUsersTable()
    // await createItemsTable()
    // await createTableManager()
    // await create_Order_Table()
    // await create_credit_table()
    // await create_notifications_table();
    await db.query(` DROP TABLE catalogue `)
    await db.query(` DROP TABLE transactions `)

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
    await create_inventory_order_table();
    await create_transactions_table();
    // let check = await db.query("SELECT * FROM transactions WHERE DATE = CURRENT_DATE")
    // console.log(check.rows)
}
startServer();

// KAMAH GTBank2022
// notificatons to various departments
// retur item for bar man
