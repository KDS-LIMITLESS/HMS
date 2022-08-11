import { db } from "../connection";
import SQL from "sql-template-strings";

export async function create_reports_table() {
    return await db.query(`CREATE TABLE IF NOT EXISTS report (
        waiters_name VARCHAR NOT NULL REFERENCES users (username) ON DELETE SET NULL,
        date VARCHAR NOT NULL PRIMARY KEY DEFAULT TO_CHAR(CURRENT_TIMESTAMP, 'YYYMMDD')
    )`)
}

// returns all the waiters that served items
export async function get_waiters() {
    let waiter = await db.query(SQL ` SELECT DISTINCT username FROM orders`)
    return waiter;
}

export async function get_items(waiter:string) {
    let item = await db.query(SQL `SELECT item, quantity FROM orders WHERE username = ${waiter}`)
    return item
}
