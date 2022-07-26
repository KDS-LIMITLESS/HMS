import { dbConnection } from "../connection";
import SQL from "sql-template-strings";

export async function create_credit_table() {
    const db = await dbConnection();
    return await db.query(`CREATE TABLE IF NOT EXISTS credit(
        id SERIAL PRIMARY KEY,
        opening_credit INTEGER DEFAULT 0,
        credit_granted INTEGER DEFAULT 0,
        credit_remaining INTEGER DEFAULT 0,
        username VARCHAR REFERENCES users(username) ON DELETE SET NULL
    )`)
}

export async function grant_credit(user: string, amount: number) {
    const db = await dbConnection();
    let result = await db.query(SQL `INSERT INTO credit(username, opening_credit)
        VALUES(${user}, ${amount})`);
    return result;
}

export async function get_admin_users() {
    const db = await dbConnection();

    let _ = await db.query(`SELECT users.username, opening_credit, 
        credit_granted, credit_remaining FROM users
        
        INNER JOIN credit 

        ON credit.username = users.username
        
        WHERE users.role = 'Super Admin' OR users.role = 'Auditor' OR users.role = 'Admin'
        `);
    return _
}
