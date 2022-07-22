import SQL from "sql-template-strings";
import { dbConnection } from "../connection";


export async function createItemsTable() {
    const db = await dbConnection();

    db.query(`CREATE TABLE IF NOT EXISTS 
    item(
        department VARCHAR NOT NULL,
        product VARCHAR NOT NULL,
        price INTEGER NOT NULL,
        category VARCHAR NOT NULL, 
        image VARCHAR NOT NULL,
        
        PRIMARY KEY (department,product)
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

export async function get_item(product: string, department: string) {
    const db = await dbConnection()

    let result = await db.query(SQL `SELECT product, department FROM item 
                WHERE product = ${product} AND department = ${department};`)
    return result
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

export async function add_item(product:string, price:number, category:string, image: string, department: string) {
    const db = await dbConnection();
    let result = db.query(SQL `INSERT INTO item(product, price, category, image, department) 
        VALUES(${product}, ${price}, ${category}, ${image}, ${department});`)
    return result   
}

export async function get_drinks_in_department(department: string) {
    const db = await dbConnection();

    let result = await db.query(SQL `SELECT * FROM item 
            WHERE department = ${department}`);
    return result;
}

export async function delete_item(item:string, department: string) {
    const db = await dbConnection();

    let result = await db.query(SQL `DELETE FROM item WHERE product = ${item} AND department = ${department}`)
    return result;
    
}

export async function update_item(product: string, price:number) {
    const db = await dbConnection();

    let result = await db.query(SQL`UPDATE item SET price = ${price} WHERE product = ${product}`);
    return result;
}