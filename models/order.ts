import { table } from "console";
import SQL from "sql-template-strings";
import { db} from "../connection";
import { delete_table } from "./table";


export async function create_Order_Table() {

    return await db.query(`CREATE TABLE IF NOT EXISTS orders (
        id BIGSERIAL PRIMARY KEY, 
        username VARCHAR REFERENCES users(username) ON DELETE SET NULL,
        
        item VARCHAR  REFERENCES item(product),
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        category VARCHAR NOT NULL,
        image VARCHAR REFERENCES item(image) ON DELETE NO ACTION,
        department VARCHAR REFERENCES dept(department) ON DELETE NO ACTION,

        table_name VARCHAR NOT NULL REFERENCES tables(table_name) ON DELETE NO ACTION,
        time VARCHAR
    )`)
}

export async function new_order(username: string, item: string, price: number,
            quantity: number, category: string, image: string,  department: string,
            table_name: string, time: string) {            
    try {
        let result = await db.query(SQL `INSERT INTO orders (
            username, item, price, quantity, category, image, department,
                table_name, time)
    
        VALUES (${username}, ${item}, ${price}, ${quantity}, ${category}, 
                ${image}, ${department}, ${table_name}, ${time})`);      
        return result
    } catch (e) {
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

export async function count_all_orders() {
    let count = await db.query(SQL ` SELECT count(*) FROM orders; `)
    return count;
}

export async function count_orders_in_closed_tables() {
    let count = await db.query(SQL ` SELECT count(*), tables.status FROM orders
            LEFT JOIN tables
            ON orders.table_name = tables.table_name
            WHERE tables.table_name = 'CLOSED'
            GROUP BY tables.status; `)
    return count;
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

// pos ----> ims/item
export async function decrease_item_quantity_in_pos(product:string, quantity:number, department:string){
    let prod = await db.query(SQL ` UPDATE products SET quantity = ${quantity}
        WHERE product = ${product} AND department = ${department}; `)
    return prod
}

const x = async function reduceQuantity(oldQuantity:number, newQuantity:number ) {


    return newQuantity
}
