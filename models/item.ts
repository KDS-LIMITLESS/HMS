import SQL from "sql-template-strings";
import { db } from "../connection";


export async function createItemsTable() {

    db.query(`CREATE TABLE IF NOT EXISTS 
    item(
        product VARCHAR PRIMARY KEY,
        quantity INTEGER NOT NULL, 
        size INTEGER,
        metric VARCHAR,
        image VARCHAR UNIQUE,
        reorder INTEGER DEFAULT 0,
        deleted_status VARCHAR DEFAULT 'FALSE',
        date DATE NOT NULL DEFAULT CURRENT_DATE
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

    let result = await db.query(SQL `SELECT product, quantity, deleted_status FROM item 
        WHERE product = ${product};`)
    return result
}

// product table
export async function get_product_price(product: string){
    let result = await db.query(SQL `SELECT price FROM products WHERE product = ${product}`)
    return result
}
 
// start from here 
export async function get_all_items_in_category(itemCategory: string, department: string){
    let result = db.query(SQL `SELECT * FROM products WHERE category = ${itemCategory} 
            AND department = ${department};`)
    return result
}

export async function add_item(product:string, quantity:number, image: string, 
    size:number, metric:string, reorder:string) {
    let result = await db.query(SQL `INSERT INTO item(product, quantity, 
        image, size, metric, reorder) 

        VALUES(${product}, ${quantity}, ${image}, ${size}, ${metric}, ${reorder});`)
    return result   
}

// product table
export async function get_drinks_in_department(department: string) {

    let result = db.query(SQL `SELECT DISTINCT product, price, quantity, 
        category, department, image, date FROM products
        WHERE department = ${department}`);
    return (await result).rows;
}

export async function delete_item(item:string, department:string) {

    let result = await db.query(SQL `DELETE FROM products 
        WHERE product = ${item} AND department = ${department}`)
    return result;
    
}

export async function get_date(from:string, to:Date) {
    const DATE = await db.query(SQL ` SELECT * FROM item WHERE date BETWEEN ${from} AND ${to} `)
    return DATE
}


export async function update_item(product: string, price:number, department:string) {

    let result = await db.query(SQL`UPDATE products SET price = ${price} 
        WHERE product = ${product} AND department = ${department}`);
    return result;
}


export async function update_item_quantity(product: string, quantity:number) {

    let result = await db.query(SQL`UPDATE item SET quantity = ${quantity} WHERE product = ${product}`);
    return result;
}


export async function update_reorder_level(product: string, reorder:number) {

    let result = await db.query(SQL`UPDATE item SET reorder = ${reorder} WHERE product = ${product}`);
    return result;
}

// route for deleting items from ims item
// how do i make updates on tables to reflect on other tables in postgres

// get all products sent to departments 
// from the pos, see all items in product categorize by department