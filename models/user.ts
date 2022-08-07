import { db } from "../connection";
import SQL from "sql-template-strings";

export async function createUsersTable() {

    db.query(` CREATE TABLE IF NOT EXISTS users (
        username VARCHAR NOT NULL PRIMARY KEY,
        password VARCHAR NOT NULL,
        role VARCHAR NOT NULL,
        passcode INTEGER NOT NULL UNIQUE,
        status VARCHAR NOT NULL DEFAULT 'ACTIVE'
    ) `)
}

export async function create_new_user(username:string, password:string, 
    passcode: number, role:string) 
{
    
    let result = db.query(SQL `INSERT INTO users (username, password, passcode, role) 
    VALUES (${username}, ${password}, 
        ${passcode}, ${role})`);
   
    return result;
}

export async function get_user(username:string) {

    let result = await db.query(SQL `SELECT * FROM users WHERE username = ${username}`)
    // if ((await result).rowCount === 0) return null;
    return result;
}

export async function get_admin_user(user: string){
    let role = await db.query(SQL `SELECT role FROM users WHERE username = ${user}`);
    return role
}

export async function get_admins() {
    let result = await db.query(`SELECT * FROM USERS WHERE role = 'Admin' 
        OR role = 'Super Admin' OR role = 'Auditor' `);
    return result;
}

export async function get_all_users() {

    let result = db.query(SQL `SELECT * FROM users `)
    return result;    
}

export async function get_passcode(passcode:string) {

    let result = db.query(SQL `SELECT * FROM users WHERE passcode = ${passcode}`)
    if ((await result).rowCount === 0) return null;
    return result;
}

export async function suspend_user(user: string, status: string) {

    const USER =  await db.query(SQL `UPDATE users SET status = ${status}  
        WHERE username = ${user}`)
    return USER
}

export async function delete_user(user: string) {

    const USER = await db.query(SQL `DELETE FROM users WHERE username = ${user}`);
    return USER
}

export async function update_user_role(user:string, role: string) {
    const USER = await db.query(SQL `UPDATE users SET role = ${role} WHERE username = ${user}`)
    return USER;
}

export async function update_user_password(user: string, password: string) {
    const USER = await db.query(SQL `UPDATE users SET password = ${password} WHERE username = ${user}`)
    return USER
}

export async function update_user_passcode(user: string, passcode: number) {
    const USER = await db.query(SQL `UPDATE users SET passcode = ${passcode} WHERE username = ${user}`)
    return USER
}