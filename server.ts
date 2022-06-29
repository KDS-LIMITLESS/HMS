import express from 'express'
import { dbConnection } from './connection';
import { createItemsTable } from './models/item';
import { createOrderTable } from './models/order';
import { createUsersTable } from './models/user';


const app = express();

app.use(express.json())
app.use('', require('./routes/item'));
app.use('', require('./routes/user'));


async function startServer(){
    const db = await dbConnection()
    db.connect((err, client) =>{
        if(err) return console.error(err.message)
        console.log(`Connected to Database!`)
    })

    //await createItemsTable();
    //await createOrderTable();
    await createUsersTable();
    //await db.query(`DROP TABLE ordert`)

    app.listen(3000, () => {
        console.log('Server Listening on port 3000')
    })
}

startServer()