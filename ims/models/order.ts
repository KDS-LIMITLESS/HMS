import { db } from '../../connection'
import SQL from 'sql-template-strings'

// placing orders db
export async function create_inventory_order_table() {
    return db.query(` CREATE TABLE IF NOT EXISTS catalogue (
        product VARCHAR,
        qty INTEGER NOT NULL DEFAULT 0,
        size INTEGER DEFAULT 0,
        metric VARCHAR DEFAULT ' ',
        unitprice INTEGER DEFAULT 0,
        status VARCHAR DEFAULT 'PENDING',
        date DATE NOT NULL DEFAULT CURRENT_DATE
    )`)

    // refrence the items from the pos already
}
                                                                    
export async function place_order(product:string, qty:number, size:number, metric:string, 
    unitPrice:number) {

        let order = await db.query(SQL ` INSERT INTO catalogue(product, qty, size, metric, 
            unitprice) 
        
            VALUES (${product}, ${qty}, ${size}, ${metric}, ${unitPrice})`)

        return order;
}

export async function get_one_order(order:string) {
    let isOrder = await db.query(SQL `SELECT product FROM catalogue WHERE item = ${order}`);
    return isOrder;

}

// export async function get_orders() {
//     let order = await db.query(SQL ` SELECT *, count(*) from catalogue `);
//     return order
// }

export async function update_order_status(product:string, status:string) {
    let orderStatus = await db.query(SQL ` UPDATE catalogue SET status = ${status}
        WHERE product = ${product}`)
    return orderStatus
}

export async function get_order_by_status(status:string) {
    let orderStatus = await db.query(SQL ` SELECT * FROM catalogue WHERE status = ${status}`)
    return orderStatus;
}

export async function get_all_order() {
    let order = await db.query(SQL ` SELECT product, qty, size, metric, unitprice, status, date FROM catalogue`)
    return order;
}

export async function get_orders_by_date(from:string, to:Date) {
    const DATE = await db.query(SQL ` SELECT * FROM catalogue WHERE date BETWEEN ${from} AND ${to} `)
    return DATE
}

export async function get_cancelled_orders() {
    let order = await db.query(` SELECT * FROM catalogue WHERE status = 'CANCELLED' `)
    return order
}

export async function get_received_orders() {
    let order = await db.query(` SELECT * FROM catalogue WHERE status = 'RECEIVED' `)
    return order
}

export async function update_received_order_quantity(qty:number, item:string) {
    let order = await db.query(SQL ` UPDATE catalogue SET qty = ${qty} WHERE product = ${item}  `)
    return order;
}

export async function total_placed_orders() {
    let order = await db.query(SQL ` SELECT item, qty, unitprice from catalogue WHERE date = CURRENT_DATE `)
    return order
}

export async function count_placed_order() {
    let count = await db.query(` SELECT count(*) FROM catalogue WHERE date = CURRENT_DATE `)
}
