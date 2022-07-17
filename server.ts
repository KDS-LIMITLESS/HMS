import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import { dbConnection } from './connection';
import { createItemsTable } from './models/item';
import { create_Order_Table } from './models/order';
import { createUsersTable } from './models/user';
import { createTableManager} from './models/table';

// set depeartment foreign key in order to automatically get value form items(department)
const app = express();
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(express.static('uploads'));
app.use('', require('./routes/item'));
app.use('', require('./routes/user'));
app.use('', require('./routes/order'));
app.use('', require('./routes/table'))


async function startServer(){
    const db = await dbConnection()
    db.connect((err, client) =>{
        if(err) return console.error(err.message)
        console.log(`Connected to Database!`)
    })
    
    // await createUsersTable().then(() => console.log("done creating user table")); 
    // await createItemsTable().then(() => console.log("done creating items tables"));
    // await createTableManager();
    // await create_Order_Table().then(() => console.log("done creating order table"));
 
    // await db.query(`DROP TABLE orders`)
    // await db.query(`DROP TABLE tables`)
    // await db.query(`DROP TABLE item`)
    // await db.query(`DROP TABLE users`)

    // await db.query(`ALTER TABLE tables DROP COLUMN payment_method`)

    await db.query(`ALTER TABLE tables 
        ADD  complimentary_drink VARCHAR DEFAULT ' ',
        ADD complimentary_qty INTEGER DEFAULT 0
    `)
    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log('Server Listening on port 3000')
    })
}
// remove user route
startServer()