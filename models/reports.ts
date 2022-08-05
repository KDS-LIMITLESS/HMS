import { dbConnection } from "../connection";
import SQL from "sql-template-strings";

export async function create_reports_table() {
    const db = await dbConnection();
    return await db.query(`CREATE TABLE IF NOT EXISTS report (
        waiters_name VARCHAR NOT NULL REFERENCES users (username) ON DELETE SET NULL,
        date VARCHAR NOT NULL PRIMARY KEY DEFAULT TO_CHAR(CURRENT_TIMESTAMP, 'YYYMMDD')
    )`)
}

export async function get_waiters_that_closed_tables() {
    const db = await dbConnection();

    let waiter = await db.query(SQL`SELECT waiter, date from tables`)
    return waiter;
}

