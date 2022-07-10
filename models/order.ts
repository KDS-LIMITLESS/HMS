import SQL from "sql-template-strings";
import { dbConnection } from "../connection";


export async function createOrderTable() {
    const db = await dbConnection()

    return db.query(`CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY, 
        username VARCHAR NOT NULL REFERENCES users(username),
        
        item VARCHAR NOT NULL REFERENCES item(product),
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        category VARCHAR NOT NULL,
        image VARCHAR NOT NULL,
        
        total INTEGER NOT NULL,
        table_name VARCHAR NOT NULL REFERENCES person(table_name),
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

export async function get_table_orders(name:string, tbl: string){
    const db = await dbConnection();
    const result = db.query(SQL `SELECT item, price, quantity, category, image FROM orders 
            WHERE username = ${name} AND table_name = ${tbl}`)
    if ((await result).rowCount === 0) return null;
    return (await result).rows
}

export async function get_drinks_in_table(item: string, col: string ){
    const db = await dbConnection();
    

    let result = db.query(SQL `SELECT item, price, quantity, category, image FROM orders 
            WHERE item = ${item} AND table_name = ${col}`);
    return result;
}

export async function update_order_quantity(item:string, quantity: string, tbl: string) {
    const db = await dbConnection();

    let result = db .query(SQL `UPDATE orders SET quantity = ${quantity} 
        WHERE item = ${item} AND table_name = ${tbl}`)
    return result;
}