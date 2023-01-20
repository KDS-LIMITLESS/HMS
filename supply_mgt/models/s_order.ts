import { db }from '../../connection'
import { SQL } from 'sql-template-strings'

export async function create_supply_orders_table() {
    return await db.query(`CREATE TABLE IF NOT EXISTS s_orders(
        id BIGSERIAL PRIMARY KEY,
        item VARCHAR REFERENCES item(products) ON DELETE CASCADE,
        quantity INTEGER NOT NULL,
        size INTEGER NOT NULL,
        unitPrice INTEGER, 
        measure VARCHAR,
        supplier VARCHAR REFERENCES suppliers(name) ON DELETE CASCADE,
        status VARCHAR DEFAULT 'PENDING'
    )`)
}

export async function get_order(supplier:string, item:string, status:string) {
    let order = await db.query(SQL `SELECT supplier, item, status FROM s_orders
        WHERE supplier = ${supplier}, item = ${item}, status = 'PENDING'`)
    return order
}

export async function place_supply_order(item:string, quantity:number, size:number,
    unitPrice:number, measure:number, supplier:string){
        let result = await db.query(SQL `INSERT INTO s_orders(item, quantity, size,
            unitPrice, measure, supplier)

            VALUES(${item}, ${quantity}, ${size}, ${unitPrice}, ${measure}, ${supplier})`)
        return result
}

export async function receive_supply_order(supplier:string, item:string) {
    return await db.query(SQL `UPDATE s_orders SET status = 'RECEIVED' 
        WHERE supplier = ${supplier} AND item = ${item} AND status = 'PENDING'`)
}

export async function cancel_supply_order(supplier:string, item:string) {
    return await db.query(SQL `UPDATE s_orders SET status = 'CANCELLED' 
        WHERE supplier = ${supplier} AND item = ${item} AND status = 'PENDING'`)
}
