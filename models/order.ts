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
        category VARCHAR NOT NULL,
        image VARCHAR NOT NULL,
        
        total INTEGER NOT NULL,
        table_name VARCHAR NOT NULL,
        payment_method VARCHAR NOT NULL,
        time VARCHAR
    )`)

}

export async function new_order(username: string, item: string, price: number,
            quantity: number, category: string, image: string, total: number, 
            table_name: string, paymentMethod: string, time: string) {            
    const db = await dbConnection();
    let result = db.query(SQL `INSERT INTO 
    orders (username, item, price, quantity, category, image, total, 
            table_name, payment_method, time)

    VALUES (${username}, ${item}, ${price}, ${quantity}, ${category}, 
            ${image}, ${total}, ${table_name}, ${paymentMethod}, ${time})`);
    return result
}

export async function get_all_order() {

}

// get waiters table

// item[product] = item
// item[price] = price
// item[image] = image
// item[category] = category