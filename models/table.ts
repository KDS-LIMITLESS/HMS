import SQL from "sql-template-strings";
import { dbConnection } from "../connection";


export async function createTableManager(){
    const db = await dbConnection();

    return db.query(`CREATE TABLE IF NOT EXISTS tables (
        table_name VARCHAR NOT NULl PRIMARY KEY,
        waiter VARCHAR NOT NULL references users(username),
        status VARCHAR NOT NULL DEFAULT 'OPEN',
        cash INTEGER DEFAULT 0,
        pos INTEGER  DEFAULT 0,
        transfer INTEGER  DEFAULT 0,
        credit INTEGER DEFAULT 0,
        total INTEGER NOT NULL DEFAULT 0,   
        discount INTEGER DEFAULT 0
    )`)
}

export async function create_new_table(tableName: string, waiter: string) {
    const db = await dbConnection();
    let result = db.query(SQL `INSERT INTO tables (table_name, waiter) 
                        VALUES(${tableName}, ${waiter})`)
    return result
}

export async function get_all_waiter_tables(waiter: string){
    const db = await dbConnection();
    const result = await db.query(SQL `SELECT * FROM tables WHERE waiter = ${waiter}`)
    if (result.rowCount === 0) return null
    return result.rows
}

export async function get_all_tables() {
    const db = await dbConnection();
    let result = db.query(SQL `SELECT * FROM tables`)
    if ((await result).rowCount === 0) return null;
    return result
}

export async function get_table(table_name:string) {
    const db = await dbConnection();
    let result = await db.query(SQL `SELECT table_name FROM tables WHERE table_name = ${table_name}`)
    return result
}

export async function get_table_discount(table_name:string) {
    const db = await dbConnection();
    let result = await db.query(SQL `SELECT waiter, discount FROM tables WHERE table_name = ${table_name}`)
    return result
}

export async function get_one_waiter_table(tbl_name:string, waiter: string) {
    const db = await dbConnection();
    let result = await db.query(SQL `SELECT table_name, status from tables 
            WHERE table_name = ${tbl_name} AND waiter = ${waiter}`)
    return result
}

export async function delete_table(table_name: string, waiter: string) {
    const db = await dbConnection();

    const DEL_TABLE = await db.query(`DELETE FROM tables WHERE table_name = ${table_name} 
                                AND waiter = ${waiter}`);
    return DEL_TABLE;
}

export async function close_table(waiter:string, status: string, tbl_name: string, cash: number, 
        pos: number, credit: number, transfer: number, total: number, discount: string) {
    const db = await dbConnection();
    let result = await db.query(SQL `UPDATE tables SET status = ${status}, 
        cash = ${cash}, pos = ${pos}, transfer = ${transfer}, credit = ${credit}, 
        total = ${total}, discount = ${discount}
        WHERE table_name = ${tbl_name} AND waiter = ${waiter}`)
    return result
}

// export async function closed_Tables_db() {
//     const db = await dbConnection();
//     return await db.query(`CREATE TABLE IF NOT EXISTS closedtbl(
//         waiter VARCHAR NOT NULL references users(username),
//         table_name VARCHAR NOT NULL REFERENCES tables(table_name) PRIMARY KEY,
//         cash VARCHAR NOT NULL,
//         total INTEGER NOT NULL,
//         time VARCHAR NOT NULL
//     )`)
// }
// 
// export async function close_order_table(waiter: string, tbl_name: string, cash: string, 
//                 total: number, time: string) {
//     const db = await dbConnection();
//     let result = await db.query(SQL `INSERT INTO closedtbl ( waiter, table_name, cash, total, time ) 
//         VALUES (${waiter}, ${tbl_name}, ${cash}, ${total}, ${time})`)
// 
//     return result;
// }
// 
// export async function get_closed_tables(tbl_name:string) {
//     const db = await dbConnection() ;
//     const result = await db.query(SQL `SELECT table_name FROM closedtbl WHERE table_name = ${tbl_name}` )
//     return result
// }