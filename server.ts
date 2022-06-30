import express from 'express'
import dotenv from "dotenv"
import { dbConnection } from './connection';
import { createItemsTable } from './models/item';
import { createOrderTable } from './models/order';
import { createUsersTable } from './models/user';


const app = express();
dotenv.config()

app.use(express.json())
app.use('', require('./routes/item'));
app.use('', require('./routes/user'));


async function startServer(){
    const db = await dbConnection()
    db.connect((err, client) =>{
        if(err) return console.error(err.message)
        console.log(`Connected to Database!`)
    })

    // await createItemsTable().then(() => console.log("done creating items tables"));
    // await createOrderTable().then(() => console.log("done creating order table"));
    await createUsersTable().then(() => console.log("done creating user table")); 
    //await db.query(`DROP TABLE users`)
    
    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log('Server Listening on port 3000')
    })
}

startServer()