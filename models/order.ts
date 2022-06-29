import SQL from "sql-template-strings";
import { dbConnection } from "../connection";


export async function createOrderTable() {
    const db = await dbConnection()

    db.query(`CREATE TABLE IF NOT EXISTS orders (
        waiter VARCHAR NOT NULL,
        item VARCHAR NOT NULL,
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        amount INTEGER NOT NULL,
        time DATE
    )`)
}

export async function new_order(){
    const db = await dbConnection();
}