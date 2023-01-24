// users -> name, gender, phone, email, address
// orders --> itemName, quantity, size, unitPrice, totalPrice, measureUnit Status: Pending

import { db }from '../../connection'
import { SQL } from 'sql-template-strings'


export async function create_suppliers_table() {
    return await db.query(`CREATE TABLE IF NOT EXISTS suppliers(
        name VARCHAR PRIMARY KEY NOT NULL,
        gender CHAR NOT NULL,
        phone VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        product VARCHAR
    )`)
}


export async function find_supplier(supplier:string) {
    return await db.query(SQL` SELECT * FROM suppliers WHERE name = ${supplier}`)
}

export async function get_all_supplier() {
    return await db.query(SQL` SELECT * from suppliers`)
}

export async function new_supplier(name:string, email:string, phone:string, 
    gender:string, address: string, product:string ){
        let result = await db.query(SQL `INSERT INTO suppliers(name, email, phone,
            gender, address, product)
            VALUES(${name}, ${email}, ${phone}, ${gender}, ${address}, ${product})`)
        return result
}