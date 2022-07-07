import SQL from "sql-template-strings";
import { dbConnection } from "../connection";


export async function createTableManager(){
    const db = await dbConnection();

    return db.query(`CREATE TABLE IF NOT EXISTS person (
        id SERIAL PRIMARY KEY,
        table_name VARCHAR NOT NULl,
        waiter VARCHAR NOT NULL references users(username)
    )`)
}

export async function create_new_table(table_name: string, waiter: string) {
    const db = await dbConnection();
    let result = db.query(SQL `INSERT INTO person (table_name, waiter) 
                        VALUES(${table_name}, ${waiter})`)
    return result
}

export async function get_table(table_name: string){
    const db = await dbConnection();
    const result = db.query(SQL `SELECT * FROM person WHERE table_name = ${table_name}`)
    return (await result).rows[0]['table_name']
}