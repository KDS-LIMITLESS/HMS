import SQL from "sql-template-strings";
import { dbConnection } from "../connection";


export async function createTableManager(){
    const db = await dbConnection();

    return db.query(`CREATE TABLE IF NOT EXISTS person (
        table_name VARCHAR NOT NULl PRIMARY KEY,
        waiter VARCHAR NOT NULL references users(username)
    )`)
}

export async function create_new_table(tableName: string, waiter: string) {
    const db = await dbConnection();
    let result = db.query(SQL `INSERT INTO person (table_name, waiter) 
                        VALUES(${tableName}, ${waiter})`)
    return result
}

export async function get_waiter_tables(waiter: string){
    const db = await dbConnection();
    const result = db.query(SQL `SELECT table_name FROM person WHERE waiter = ${waiter}`)
    if ((await result).rowCount === 0) return null
    return (await result).rows
}

export async function get_all_tables() {
    const db = await dbConnection();
    let result = db.query(SQL `SELECT table_name FROM person`)
    if ((await result).rowCount === 0) return null;
    return result
}

export async function get_table(table:string) {
    const db = await dbConnection();
    let result = db.query(SQL `SELECT table_name FROM person WHERE table_name = ${table}`)
    if ((await result).rowCount === 0) return null;
    return (await result).rows
}