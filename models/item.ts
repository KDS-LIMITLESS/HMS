import SQL from "sql-template-strings";
import { db } from "../connection";


export async function createItemsTable() {

    db.query(`CREATE TABLE IF NOT EXISTS 
    item(
        product VARCHAR PRIMARY KEY,
        category VARCHAR NOT NULL, 
        quantity INTEGER NOT NULL, 
        size INTEGER,
        metric VARCHAR,
        image VARCHAR NOT NULL,
        reorder INTEGER DEFAULT 0    
    )`, 
    (err, result) =>{
        if(err) return console.error(err.message);
        return result
    })
}
// add another table for sending items 
// itemName price department 

export async function createProductTable() {

    db.query(`CREATE TABLE IF NOT EXISTS 
    product(
        product VARCHAR REFERENCES item(product),
        price INTEGER  DEFAULT 0,
        quantity INTEGER DEFAULT 0,
        department VARCHAR REFERENCES dept(department)
    )`, 
    (err, result) =>{
        if(err) return console.error(err.message);
        return result
    })
}

export async function createDeptTable() {

    db.query(`CREATE TABLE IF NOT EXISTS 
    dept(
        department VARCHAR PRIMARY KEY NOT NULL
    )`, 
    (err, result) =>{
        if(err) return console.error(err.message);
        return result
    })
}

export async function create_dept(dept:string) {
    let department = await db.query(SQL ` INSERT INTO dept(department)
        VALUES(${dept});`)
}

export async function get_all_items() {
    let result = db.query('SELECT * FROM item')
    return result;
}

export async function get_item(product: string) {

    let result = await db.query(SQL `SELECT product FROM item 
        WHERE product = ${product};`)
    return result
}

export async function get_product_price(product: string){
    let result = db.query(SQL `SELECT price FROM item WHERE product = ${product}`)
    if ((await result).rowCount === 0) return null;
    return (await result).rows[0]['price']
}
 
// start from here 
export async function get_all_items_with_category(itemCategory: string, department: string){
    let result = db.query(SQL `SELECT * FROM item WHERE category = ${itemCategory} 
            AND department = ${department};`)
    return result
}

export async function add_item(product:string, category:string, quantity:number, image: string, 
    size:number, metric:string, reorder:string) {
    let result = await db.query(SQL `INSERT INTO item(product,category, quantity, 
        image, size, metric, reorder) 

        VALUES(${product}, ${category}, ${quantity}, ${image}, ${size}, ${metric}, ${reorder});`)
    return result   
}

export async function get_drinks_in_department(department: string) {

    let result = await db.query(SQL `SELECT * FROM item 
            WHERE department = ${department}`);
    return result;
}

export async function delete_item(item:string, department: string) {

    let result = await db.query(SQL `DELETE FROM item WHERE product = ${item} AND department = ${department}`)
    return result;
    
}

export async function update_item(product: string, price:number) {

    let result = await db.query(SQL`UPDATE item SET price = ${price} WHERE product = ${product}`);
    return result;
}