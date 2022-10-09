import SQL from "sql-template-strings";
import { db } from "../connection";


export async function createItemsTable() {

    db.query(`CREATE TABLE IF NOT EXISTS 
    item(
        product VARCHAR PRIMARY KEY,
        category VARCHAR UNIQUE NOT NULL, 
        quantity INTEGER NOT NULL, 
        size INTEGER,
        metric VARCHAR,
        image VARCHAR UNIQUE NOT NULL,
        reorder INTEGER DEFAULT 0    
    )`, 
    (err, result) =>{
        if(err) return console.error(err.message);
        return result
    })
}
// add another table for sending items 
// itemName price department 
// total orders  count api
// add images table

// modify the add new item functions
//   modify update item functions 
// modify delete item 
// modify all get items functions


// table for products of each dept. with price


export async function get_all_items() {
    let result = db.query('SELECT * FROM item')
    return result;
}

export async function get_item(product: string) {

    let result = await db.query(SQL `SELECT * FROM item 
        WHERE product = ${product};`)
    return result
}


// product table
export async function get_product_price(product: string){
    let result = await db.query(SQL `SELECT price FROM product WHERE product = ${product}`)
    return result
}
 
// start from here 
export async function get_all_items_in_category(itemCategory: string, department: string){
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


// product table
export async function get_drinks_in_department(department: string) {

    let result = await db.query(SQL `SELECT * FROM product
            WHERE department = ${department}`);
    return result;
}



export async function delete_item(item:string, department: string) {

    let result = await db.query(SQL `DELETE FROM item WHERE product = ${item}`)
    return result;
    
}



export async function update_item(product: string, price:number) {

    let result = await db.query(SQL`UPDATE item SET price = ${price} WHERE product = ${product}`);
    return result;
}


// how do i make updates on tables to reflect on other tables in postgres

// get all products sent to departments 
// from the pos, see all items in product categorize by department