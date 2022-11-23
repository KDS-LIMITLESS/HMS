import SQL from "sql-template-strings";
import { db } from "../connection";

export async function createProductTable() {

    db.query(`CREATE TABLE IF NOT EXISTS 
    products(
        id BIGSERIAL PRIMARY KEY,
        product VARCHAR REFERENCES item(product) ON DELETE CASCADE ON UPDATE CASCADE,
        price INTEGER  NOT NULL DEFAULT 0,
        category VARCHAR NOT NULL, 
        quantity INTEGER DEFAULT 0,
        image VARCHAR,
        department VARCHAR REFERENCES dept(department) ON DELETE NO ACTION ON UPDATE NO ACTION,
        date DATE NOT NULL DEFAULT CURRENT_DATE
    )`, 
    (err, result) =>{
        if(err) return console.error(err.message);
        return result
    })
}

export async function get_product_price(product: string){
    let result = await db.query(SQL `SELECT price FROM products WHERE product = ${product}`)
    return result
}
 
export async function get_all_items_in_category(itemCategory: string, department: string){
    let result = db.query(SQL `SELECT * FROM products WHERE category = ${itemCategory} 
            AND department = ${department};`)
    return result
}

export async function get_drinks_in_department(department: string) {

    let result = db.query(SQL `SELECT DISTINCT product, price, quantity, 
        category, department, image, date FROM products
        WHERE department = ${department}`);
    return (await result).rows;
}

export async function delete_product(item:string, department:string) {

    let result = await db.query(SQL `DELETE FROM products 
        WHERE product = ${item} AND department = ${department}`)
    return result;
    
}

export async function send_item_to_pos_department(product:string, department:string, quantity:number, image:string, category:string, price:number) {
    let result = await db.query(SQL ` INSERT INTO products(product, department, quantity, image, category, price)
        VALUES(${product}, ${department}, ${quantity}, ${image}, ${category}, ${price});`)
    return result;
}

export async function get_product_in_department(product:string, dept:string)  {
    let item = await db.query(SQL ` SELECT product, quantity FROM products WHERE product = ${product} AND
        department = ${dept} `)
    return item
}

export async function update_item_in_pos(product:string, quantity:number, department:string, price:number){
    let prod = await db.query(SQL ` UPDATE products SET quantity = ${quantity},price = ${price},
        date =  CURRENT_DATE
        WHERE product = ${product} AND department = ${department}; `)
    return prod
}

export async function update_item(product: string, price:number, department:string) {

    let result = await db.query(SQL`UPDATE products SET price = ${price} 
        WHERE product = ${product} AND department = ${department}`);
    return result;
}
