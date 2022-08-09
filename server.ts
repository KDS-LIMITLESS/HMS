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

const app = express();
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(express.static('uploads'));
app.use('', require('./routes/item'));
app.use('', require('./routes/user'));
app.use('', require('./routes/order'));
app.use('', require('./routes/table'))
app.use('', require('./routes/credit'))
app.use('', require('./routes/reports'))
app.use('', require('./routes/notiffication'))

db.connect((err) => {
    if(err) return console.error(err.message)
    console.log(`Connected to Database!`)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
     console.log('Server Listening on port 5000')
})

async function startServer() {
    //await create_notifications_table();
}
startServer();
    // console.log(await db.end())
    
    // const db = dbConnection()
    
    // const d = await db.query(`SELECT * FROM pg_stat_activity`)
    // console.log(d.rows)
    // await createUsersTable().then(() => console.log("done creating user table")); 
    // await createItemsTable().then(() => console.log("done creating items tables"));
    // await createTableManager().then(() => console.log(`Tables done`));
    // await create_Order_Table().then(() => console.log("done creating order table"));
    // await create_credit_table().then(() => console.log(`credit table`))
   

    // await db.query(`DROP TABLE orders`)
    // await db.query(`DROP TABLE tables`)
    // await db.query(`DROP TABLE item`)
    // await db.query(`DROP TABLE users`)
    // await db.query(`DROP TABLE credit`)