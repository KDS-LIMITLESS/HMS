import SQL from "sql-template-strings";
import { dbConnection } from "../connection";


export async function createItemsTable() {
    const db = await dbConnection();

    db.query(`CREATE TABLE IF NOT EXISTS 
    item(
        product VARCHAR UNIQUE NOT NULL PRIMARY KEY,
        price INTEGER NOT NULL,
        category VARCHAR NOT NULL, 
        image VARCHAR NOT NULL
    )`, 
    (err, result) =>{
        if(err) return console.error(err.message);
        return result
    })
    
}

export async function get_all_items() {
    const db = await dbConnection();
    let result = db.query('SELECT * FROM item')
    return result;
}

export async function get_item(product: string) {
    const db = await dbConnection()
    let result = db.query(SQL `SELECT product FROM item WHERE product = ${product};`)
    if ((await result).rowCount === 0) return null
    return (await result).rows[0]['product']
}

export async function get_product_price(product: string){
    const db = await dbConnection();
    let result = db.query(SQL `SELECT price FROM item WHERE product = ${product}`)
    if ((await result).rowCount === 0) return null;
    return (await result).rows[0]['price']
}
 
export async function get_all_items_with_category(itemCategory: string){
    const db = await dbConnection();
    let result = db.query(SQL `SELECT * FROM item WHERE category = ${itemCategory};`)
    return result
}

export async function add_item(product:string, price:number, category:string, image: string) {
    const db = await dbConnection();
    let result = db.query(SQL `INSERT INTO item(product, price, category, image) 
        VALUES(${product}, ${price}, ${category}, ${image});`)
    return result   
}
