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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
     console.log('Server Listening on port 3000')
})

async function startServer() {
    // await createUsersTable();
    await createItemsTable();
    await create_Order_Table()
    await createTableManager()
    await create_notifications_table();
    await create_credit_table()

    // await db.query(`ALTER TABLE notification 
    //     DROP CONSTRAINT notification_waiter_fkey,
    //     ALTER waiter DROP NOT NULL,
    //     ADD CONSTRAINT notification_waiter_fkey FOREIGN KEY (waiter)
    //     REFERENCES users(username) ON DELETE SET DEFAULT`)
    
}
startServer();


// notificatons to various departments
// retur item for bar man
