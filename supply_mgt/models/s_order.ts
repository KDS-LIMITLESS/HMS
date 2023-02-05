import { db }from '../../connection'
import { SQL } from 'sql-template-strings'

export async function create_supply_orders_table() {
    return await db.query(`CREATE TABLE IF NOT EXISTS s_orders(
        id BIGSERIAL PRIMARY KEY,
        item VARCHAR,
        quantity INTEGER NOT NULL,
        size INTEGER NOT NULL,
        unitPrice INTEGER, 
        total_price INTEGER NOT NULL,
        measure VARCHAR,
        supplier VARCHAR REFERENCES suppliers(name) ON DELETE CASCADE,
        status VARCHAR DEFAULT 'PENDING',
        date DATE NOT NULL DEFAULT CURRENT_DATE
    )`)
}

export async function get_order(supplier:string, item:string, status:string) {
    let order = await db.query(SQL `SELECT supplier, item, status FROM s_orders
        WHERE supplier = ${supplier} AND item = ${item} AND status = 'PENDING'`)
    return order
}

export async function place_supply_order(item:string, quantity:number, size:number,
    unitPrice:number, measure:string, supplier:string, total_price:number, status:string){
        let result = await db.query(SQL `INSERT INTO s_orders(item, quantity, size,
            unitPrice, measure, supplier, total_price, status)

            VALUES(${item}, ${quantity}, ${size}, ${unitPrice}, ${measure}, ${supplier}, 
                ${total_price}, ${status})`)
        return result
}
// what if received before trying to set damaged -- Error

export async function receive_supply_order(supplier:string, item:string) {
    return await db.query(SQL `UPDATE s_orders SET status = 'RECEIVED' 
        WHERE supplier = ${supplier} AND item = ${item} AND status = 'PENDING'`)
}

export async function cancel_supply_order(supplier:string, item:string) {
    return await db.query(SQL `UPDATE s_orders SET status = 'CANCELLED' 
        WHERE supplier = ${supplier} AND item = ${item} AND status = 'PENDING'`)
}

export async function  get_all_supplier_placed_order(supplier:string) {
    return await db.query(SQL ` SELECT * FROM s_orders WHERE status = 'PENDING' AND 
        supplier = ${supplier} `)
}

export async function  get_all_supplier_received_orders(supplier:string) {
    return await db.query(SQL ` SELECT * FROM s_orders WHERE status = 'RECEIVED' AND 
        supplier = ${supplier}  `)
}

export async function  get_all_cancelled_orders(supplier:string) {
    return await db.query(SQL ` SELECT * FROM s_orders WHERE status = 'CANCELLED' AND 
        supplier = ${supplier}  `)
}

export async function  get_all_damaged_orders(supplier:string) {
    return await db.query(SQL ` SELECT * FROM s_orders WHERE status = 'DAMAGED' AND 
        supplier = ${supplier}  `)
}

export async function  get_all_returned_orders(supplier:string) {
    return await db.query(SQL ` SELECT * FROM s_orders WHERE status = 'RETURNED' AND 
        supplier = ${supplier}  `)
}

export async function get_total(supplier:string) {
    return await db.query(SQL ` (SELECT 'total' AS Type, SUM(total_price)  FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'PENDING')

        UNION
        
        (SELECT 'placed_orders', COUNT(item) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'PENDING')
        
        UNION 

        (SELECT 'received_orders', COUNT(item) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'RECEIVED')
        
        UNION 

        (SELECT 'cancelled_orders', COUNT(item) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'CANCELLED')

        UNION 

        (SELECT 'damaged_orders', COUNT(item) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'DAMAGED')

        UNION 

        (SELECT 'returned_orders', COUNT(item) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'RETURNED')
        
        UNION 

        (SELECT 'total_received', SUM(total_price) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'RECEIVED')

        UNION 

        (SELECT 'total_cancelled', SUM(total_price) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'CANCELLED')

        UNION 

        (SELECT 'total_damaged', SUM(total_price) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'DAMAGED')

        UNION 

        (SELECT 'total_returned', SUM(total_price) FROM s_orders 
        WHERE supplier = ${supplier} AND status = 'RETURNED')
        
    `)
}

export async function get_all_placed_orders() {
    return await db.query(SQL `SELECT * FROM s_orders WHERE status = 'PENDING';
    `)
}

export async function get_all_received_orders() {
    return await db.query(SQL `SELECT * FROM s_orders WHERE status = 'RECEIVED';
    `)
}
export async function get_order_counts() {
    return await db.query(SQL `SELECT 'placed_order' AS Type, COUNT(*) FROM 
        (SELECT item FROM s_orders WHERE status = 'PENDING') AS placed_order
        
        UNION

        SELECT 'received_order', COUNT(*) FROM 
        (SELECT item FROM s_orders WHERE status = 'RECEIVED') AS received_order
        
        UNION 

        (SELECT 'total_received', SUM(total_price) FROM s_orders 
        WHERE status = 'RECEIVED')

        UNION 

        (SELECT 'total_placed', SUM(total_price) FROM s_orders 
        WHERE status = 'PENDING')

        UNION 

        (SELECT 'total_supplier', COUNT(name) FROM suppliers)
        
    `)
}
export async function get_date(from:string, to:Date) {
    const DATE = await db.query(SQL ` SELECT * FROM s_orders WHERE date BETWEEN ${from} AND ${to} `)
    return DATE
}