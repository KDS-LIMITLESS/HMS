import { db } from "../../connection";
import SQL from "sql-template-strings"


export async function create_transactions_table() {
    let transaction = await db.query(`CREATE TABLE IF NOT EXISTS transactions(
        id BIGSERIAL PRIMARY KEY,
        item VARCHAR NOT NULL,
        department VARCHAR NOT NULL,
        quantity INTEGER NOT NULL,
        size INTEGER,
        metric VARCHAR,
        date DATE NOT NULL DEFAULT CURRENT_DATE,

        FOREIGN KEY (department, item ) REFERENCES item(department, product)
    )`)
    return transaction
}

export async function send_items_to_depts(item:string, department:string, quantity:number,
    size:number, metric:string) {

    const EXPORTS = db.query(SQL ` INSERT INTO transactions(item, department, quantity, size, metric)
        VALUES(${item}, ${department}, ${quantity}, ${size}, ${metric})`)
    
    return EXPORTS
}

export async function get_departments() {
    const dept = db.query(SQL ` SELECT DISTINCT department from item `)
    return dept
}

export async function get_all_sent_items() {
    const items = await db.query(SQL` SELECT * FROM transactions WHERE DATE = CURRENT_DATE`)
    return items
}

export async function get_date(from:string, to:Date) {
    const DATE = await db.query(SQL ` SELECT * FROM transactions WHERE date BETWEEN ${from} AND ${to} `)
    return DATE
}