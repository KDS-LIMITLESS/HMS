import { dbConnection } from "../connection";
import SQL from "sql-template-strings";

export async function createUsersTable(){
    const db = await dbConnection()

    db.query(` CREATE TABLE IF NOT EXISTS users (
        username VARCHAR NOT NULL PRIMARY KEY,
        password VARCHAR NOT NULL
    ) `)
}

export async function create_new_user(username:string, password:string){
    const db = await dbConnection();
    
    let result = db.query(SQL `INSERT INTO users (username, password) VALUES (${username}, ${password})`);
   
    return result;
}

export async function get_user(username:string) {
    const db = await dbConnection();

    let result = db.query(SQL `SELECT * FROM users WHERE username = ${username}`)
    if ((await result).rowCount === 0) return null;
    return result;
}