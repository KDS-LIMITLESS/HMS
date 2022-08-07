import { db } from "../connection";
import SQL from "sql-template-strings";


export async function create_credit_table() {
    return await db.query(`CREATE TABLE IF NOT EXISTS credit(
        id SERIAL PRIMARY KEY,
        opening_credit INTEGER DEFAULT 0,
        credit_granted INTEGER DEFAULT 0,
        credit_remaining INTEGER DEFAULT 0,
        username VARCHAR REFERENCES users(username) ON DELETE SET NULL
    )`)
}

export async function grant_credit(user: string, opening_credit: number, credit_remaining: number) {
    let result = await db.query(SQL `INSERT INTO credit(username, opening_credit, credit_remaining)
        VALUES(${user}, ${opening_credit}, ${credit_remaining})`);
    return result;
}

export async function update_credit_status(user: string, opening_credit: number, credit_remaining: number){

    let creditResult = await db.query(SQL `UPDATE credit SET 
        opening_credit = ${opening_credit}, credit_remaining = ${credit_remaining}
        WHERE username = ${user}`);
    return creditResult
}

export async function calculate_credit_balance(user:string, credit_remaining: number, credit_granted: number) {

    let updateBalance = await db.query(SQL `UPDATE credit SET credit_remaining = ${credit_remaining},
        credit_granted = ${credit_granted} WHERE username = ${user}`);
    return updateBalance;
}

export async function get_admin_users() {

    let _ = await db.query(`SELECT users.username, opening_credit, 
        credit_granted, credit_remaining FROM users
        
        LEFT JOIN credit 

        ON users.username = credit.username

        WHERE users.role = 'Super Admin' OR users.role = 'Auditor' OR users.role = 'Admin'
        `);
    return _
}

export async function get_credit_status(user: string) {
    let _ = await db.query(SQL`SELECT credit_remaining, credit_granted, opening_credit
        FROM credit WHERE username = ${user}`)
    return _
}

export async function get_credit_balance(user: string) {

    let balance = await db.query(SQL `SELECT * FROM credit WHERE user = ${user}`)
    return balance
}