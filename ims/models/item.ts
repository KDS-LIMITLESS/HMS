import { db } from "../../connection";
import SQL from "sql-template-strings"


export async function createItemsTable() {

    db.query(`CREATE TABLE IF NOT EXISTS 
    item(
        product VARCHAR PRIMARY KEY,
        quantity INTEGER, 
        size INTEGER,
        metric VARCHAR,
        image VARCHAR,
        reorder INTEGER DEFAULT 0,
        deleted_status VARCHAR DEFAULT 'FALSE',
        date DATE NOT NULL DEFAULT CURRENT_DATE
    )`, 
    (err, result) =>{
        if(err) return console.error(err.message);
        return result
    })
}

export async function get_all_items() {
    let result = db.query('SELECT * FROM item')
    return result;
}

export async function get_item(product: string) {

    let result = await db.query(SQL `SELECT product, quantity, deleted_status FROM item 
        WHERE product = ${product};`)
    return result
}

export async function add_item(product:string, quantity:number, image: string, 
    size:number, metric:string, reorder:string) {
    let result = await db.query(SQL `INSERT INTO item(product, quantity, 
        image, size, metric, reorder) 

        VALUES(${product}, ${quantity}, ${image}, ${size}, ${metric}, ${reorder});`)
    return result   
}

export async function reduce_item_quantity(products:string, quantity:number){
    let product = await db.query(SQL ` UPDATE item SET quantity = ${quantity} WHERE product = ${products}; `)
    return product

}

export async function get_product_image(product:string) {
    let image = await db.query(SQL ` SELECT image from item WHERE product = ${product} `)
    return image.rows[0]['image']
}

// ims functions

export async function update_item_status(product: string) {

    let result = await db.query(SQL`UPDATE item SET deleted_status = 'TRUE' 
        WHERE product = ${product}`);
    return result;
}

export async function delete_item(item:string) {

    let result = await db.query(SQL `DELETE FROM item WHERE product = ${item}`)
    return result;
    
}

export async function get_date(from:string, to:Date) {
    const DATE = await db.query(SQL ` SELECT * FROM item WHERE date BETWEEN ${from} AND ${to} `)
    return DATE
}

export async function update_item_quantity(product: string, quantity:number) {

    let result = await db.query(SQL`UPDATE item SET quantity = ${quantity} WHERE product = ${product}`);
    return result;
}

export async function update_reorder_level(product: string, reorder:number) {

    let result = await db.query(SQL`UPDATE item SET reorder = ${reorder} WHERE product = ${product}`);
    return result;
}