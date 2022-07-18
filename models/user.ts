import { dbConnection } from "../connection";
import SQL from "sql-template-strings";

export async function createUsersTable(){
    const db = await dbConnection()

    db.query(` CREATE TABLE IF NOT EXISTS users (
        username VARCHAR NOT NULL PRIMARY KEY,
        password VARCHAR NOT NULL,
        role VARCHAR NOT NULL,
        passcode INTEGER NOT NULL UNIQUE
    ) `)
}

export async function create_new_user(username:string, password:string, 
    passcode: number, role:string) 
{
    const db = await dbConnection();
    
    let result = db.query(SQL `INSERT INTO users (username, password, passcode, role) 
    VALUES (${username}, ${password}, 
        ${passcode}, ${role})`);
   
    return result;
}

export async function get_user(username:string) {
    const db = await dbConnection();

    let result = db.query(SQL `SELECT * FROM users WHERE username = ${username}`)
    if ((await result).rowCount === 0) return null;
    return result;
}

export async function get_passcode(passcode:string) {
    const db = await dbConnection();

    let result = db.query(SQL `SELECT * FROM users WHERE passcode = ${passcode}`)
    if ((await result).rowCount === 0) return null;
    return result;
}