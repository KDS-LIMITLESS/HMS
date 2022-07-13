import SQL from "sql-template-strings";
import { dbConnection } from "../connection";


export async function create_Order_Table() {
    const db = await dbConnection()

    return await db.query(`CREATE TABLE IF NOT EXISTS orders (
        id BIGSERIAL PRIMARY KEY, 
        username VARCHAR NOT NULL REFERENCES users(username),
        
        item VARCHAR NOT NULL REFERENCES item(product),
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        category VARCHAR NOT NULL,
        image VARCHAR NOT NULL,
        
        total INTEGER NOT NULL DEFAULT 0,
        table_name VARCHAR NOT NULL REFERENCES person(table_name),
        payment_method VARCHAR NOT NULL DEFAULT '-',
        status VARCHAR NOT NULL DEFAULT 'OPEN',
        time VARCHAR
    )`)
}

export async function new_order(username: string, item: string, price: number,
            quantity: number, category: string, image: string,  
            table_name: string, time: string) {            
    const db = await dbConnection();
    let result = db.query(SQL `INSERT INTO 
    orders (username, item, price, quantity, category, image,
            table_name, time)

    VALUES (${username}, ${item}, ${price}, ${quantity}, ${category}, 
            ${image},  ${table_name}, ${time})`);
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

export async function closed_Tables() {
    const db = await dbConnection();
    return await db.query(`CREATE TABLE IF NOT EXISTS closedtbl(
        waiter VARCHAR NOT NULL references users(username),
        table_name VARCHAR NOT NULL REFERENCES person(table_name) PRIMARY KEY,
        payment_method VARCHAR NOT NULL,
        total INTEGER NOT NULL
    )`)
}

export async function close_order_table(waiter: string, tbl_name: string, payment_method: string, total: number) {
    const db = await dbConnection();
    let result = await db.query(SQL `INSERT INTO closedtbl (table_name) 
        VALUES ${tbl_name}, ${payment_method}, ${total}`)

    return result;
}