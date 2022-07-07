import SQL from "sql-template-strings";
import { dbConnection } from "../connection";


export async function createOrderTable() {
    const db = await dbConnection()

    return db.query(`CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY, 
        username VARCHAR NOT NULL references users(username),
        item VARCHAR NOT NULL references item(product),
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        total_amount INTEGER NOT NULL,
        table_name VARCHAR NOT NULL,
        time VARCHAR
    )`)

}

export async function new_order(username: string, item: string, price: number,
             quantity: number,total_amount: number, table_name: string, time: string) {            
    const db = await dbConnection();
    let result = db.query(SQL `INSERT INTO orders (username, item, price, quantity, total_amount, table_name, time)
        VALUES (${username}, ${item}, ${price}, ${quantity}, ${total_amount}, ${table_name}, ${time})`);
    return result
}

export async function get_all_order() {

}

// get waiters table