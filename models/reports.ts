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

export async function get_distinct_items(waiter:string) {
    let item = await db.query(SQL `SELECT DISTINCT item FROM orders 
        WHERE username = ${waiter}`)
    return item
}


export async function get_items(waiter:string) {
    let item = await db.query(SQL `SELECT tables.status, item, quantity, price FROM orders 

        LEFT JOIN tables

        ON tables.table_name = orders.table_name

        WHERE username = ${waiter} AND tables.status = 'CLOSED'`)
    return item
}

export async function get_all_items_sold() {
    let allItems = await db.query(
        `SELECT tables.status, item, price, 
            quantity, department FROM orders

            LEFT JOIN tables

            ON tables.table_name = orders.table_name

            WHERE tables.status = 'CLOSED'
        `);
    return allItems;
}

export async function filter_items(from_date:string, to_date:string) {
    let allItems = await db.query(SQL
        `SELECT table.table_name, tables.status, tables.date, item, price, 
            quantity, department FROM orders

            LEFT JOIN tables

            ON tables.table_name = orders.table_name

            WHERE tables.status = 'CLOSED' AND tables.date BETWEEN ${from_date} AND ${to_date}
        `);
    return allItems;
}

export async function clear_db() {
    let clear = db.query(SQL` DELETE FROM orders;
        DELETE FROM tables;
        DELETE from notification`)
    return clear;
}

`SELECT users.username, opening_credit, 
        credit_granted, credit_remaining FROM users
        
        LEFT JOIN credit 

        ON users.username = credit.username

        WHERE users.role = 'Super Admin' OR users.role = 'Auditor' OR users.role = 'Admin'
        `