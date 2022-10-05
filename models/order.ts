import { table } from "console";
import SQL from "sql-template-strings";
import { db} from "../connection";
import { delete_table } from "./table";


export async function create_Order_Table() {

    return await db.query(`CREATE TABLE IF NOT EXISTS orders (
        id BIGSERIAL PRIMARY KEY, 
        username VARCHAR REFERENCES users(username) ON DELETE SET NULL,
        
        item VARCHAR NOT NULL ,
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        category VARCHAR NOT NULL,
        image VARCHAR NOT NULL,
        department VARCHAR NOT NULL,

        table_name VARCHAR NOT NULL REFERENCES tables(table_name),
        
        time VARCHAR,
        FOREIGN KEY (department, item ) REFERENCES item(department, product) ON UPDATE NO ACTION ON DELETE NO ACTION
    )`)
}

export async function new_order(username: string, item: string, price: number,
            quantity: number, category: string, image: string,  department: string,
            table_name: string, time: string) {            
    try {
        await db.query('BEGIN')
        let result = await db.query(SQL `INSERT INTO orders (
            username, item, price, quantity, category, image, department,
                table_name, time)
    
        VALUES (${username}, ${item}, ${price}, ${quantity}, ${category}, 
                ${image}, ${department}, ${table_name}, ${time})`);
        await db.query('COMMIT')
        console.log('Committing ')
        return result
    } catch (e) {
        await db.query('ROLLBACK')
        // await delete_order(table_name);
        await delete_table(table_name, username)
        console.log('Rolling back')
        throw e;
    }
}

export async function get_table_orders(name:string, tbl: string){
    const result = db.query(SQL `SELECT username, item, price, quantity, category, image, department FROM orders 
            WHERE username = ${name} AND table_name = ${tbl}`)
    if ((await result).rowCount === 0) return null;
    return (await result).rows
}

export async function get_table_orders_for_admin(tbl_name:string) {
    const result = db.query(SQL `SELECT username, item, price, quantity, category, image, department FROM orders 
        WHERE table_name = ${tbl_name}`)
    if ((await result).rowCount === 0) return null;
    return (await result).rows
}


export async function get_drinks_in_table(item: string, col: string ){
    let result = await db.query(SQL `SELECT item, price, quantity, category, image FROM orders 
            WHERE item = ${item} AND table_name = ${col}`);
    // if (result.rowCount === 0) return null;
    return result;
}

export async function update_order_quantity(item:string, quantity: string, tbl: string) {

    let result = await db.query(SQL `UPDATE orders SET quantity = ${quantity} 
        WHERE item = ${item} AND table_name = ${tbl}`)
    // if (result.rowCount === 0) return null;
    return result;
}

export async function get_all_orders() {

    let orders = await db.query(SQL `SELECT * FROM orders`)
    return orders
}

export async function count_waiters_order(waiter: string) {

    let orderCount = await db.query(SQL `SELECT username, item FROM orders WHERE username = ${waiter}`)
    return orderCount
}

export async function delete_order(table_name: string, item: string){

    let result = await db.query(SQL `DELETE FROM orders 
    WHERE table_name = ${table_name} AND item = ${item}`)
    return result
}

export async function get_order(table_name: string, product: string) {
    let result = await db.query(SQL `SELECT item, username, table_name FROM orders 
        WHERE table_name = ${table_name} AND item = ${product}`)
    return result;
}

export async function get_waiter_order(waiter: string) {

    let _ = await db.query(SQL `SELECT item, quantity FROM orders WHERE username = ${waiter}`);

    return _
}