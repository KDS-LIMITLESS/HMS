import { db } from "../../connection";
import SQL from "sql-template-strings"


export async function transactions() {
    let transaction = await db.query(`CREATE TABLE IF NOT EXISTS transactions(
        
    )`)
}

export async function send_items_to_depts(item:string) {
    
}