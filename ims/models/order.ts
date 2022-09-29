import { db } from '../../connection'
import SQL from 'sql-template-strings'


export async function create_inventory_order_table() {
    return db.query(` CREATE TABLE IF NOT EXISTS catalogue (
        item VARCHAR,
        qty INTEGER NOT NULL DEFAULT 0,
        size INTEGER DEFAULT 0,
        metric VARCHAR DEFAULT ' ',
        unitprice INTEGER DEFAULT 0,
        status VARCHAR DEFAULT 'PENDING',
        date VARCHAR NOT NULL DEFAULT TO_CHAR(CURRENT_TIMESTAMP, 'YYYMMDD')
    )`)

    // refrence the items from the pos already
}


export async function place_order(item:string, qty:number, size:number, metric:string, 
    unitPrice:number, totalPrice:number, status:string, date:string) {

        let order = await db.query(SQL ` INSERT INTO catalogue(item, qty, size, metric, 
            unitprice, status, date) 
        
            VALUES (${item}, ${qty}, ${size}, ${metric}, ${unitPrice}, ${totalPrice}, 
            ${status}, ${date})`)

        return order;
}