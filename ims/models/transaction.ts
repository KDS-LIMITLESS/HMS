import { SQL } from 'sql-template-strings'
import { db } from '../../connection'

export async function create_transactions_table() {
    return db.query(` CREATE TABLE IF NOT EXISTS transactions (
        id BIGSERIAL PRIMARY KEY,
        product VARCHAR REFERENCES item(product) ON DELETE CASCADE ON UPDATE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 0,
        price INTEGER  NOT NULL DEFAULT 0,
        description VARCHAR,
        department VARCHAR REFERENCES dept(department) ON DELETE CASCADE,
        date DATE NOT NULL DEFAULT CURRENT_DATE
    )`)
}

export async function record_transactions(product:string, department:string, quantity:number, description:string, price:number) {
    let result = await db.query(SQL ` INSERT INTO transactions (product, department, quantity, description, price)
        VALUES(${product}, ${department}, ${quantity}, ${description}, ${price});`)
    return result;
}

export async function get_all_sent_items() {
    const items = await db.query(SQL` SELECT * FROM transactions WHERE DATE = CURRENT_DATE`)
    return items
}

export async function get_all_items_sent_to_department(department:string) {
    const items = await db.query(SQL` SELECT * FROM transactions 
        WHERE DATE = CURRENT_DATE AND department = ${department}`)
    return items
}

export async function get_date(from:string, to:Date) {
    const DATE = await db.query(SQL ` SELECT * FROM transactions WHERE date BETWEEN ${from} AND ${to} `)
    return DATE
}

export async function delete_transaction(id:number) {
    let transaction = await db.query(SQL `DELETE FROM transactions WHERE id = ${id}`)
    return transaction
}