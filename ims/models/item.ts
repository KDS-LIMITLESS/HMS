import { db } from "../../connection";
import SQL from "sql-template-strings"

// // SCRAP OUT THIS TABLE
// export async function create_transactions_table() {
//     let transaction = await db.query(`CREATE TABLE IF NOT EXISTS transactions(
//         id BIGSERIAL PRIMARY KEY,
//         item VARCHAR NOT NULL,
//         department VARCHAR NOT NULL,
//         quantity INTEGER NOT NULL,
//         size INTEGER,
//         metric VARCHAR,
//         date DATE NOT NULL DEFAULT CURRENT_DATE,

//         FOREIGN KEY (department, item ) REFERENCES item(department, product)
//     )`)
//     return transaction
// }
// DELETE THIS FUNCTION ALREADY EXISTS IN THE POS/ITEMS DB
// export async function send_items_to_depts(item:string, department:string, quantity:number,
//     size:number, metric:string) {

//     const EXPORTS = db.query(SQL ` INSERT INTO transactions(item, department, quantity, size, metric)
//         VALUES(${item}, ${department}, ${quantity}, ${size}, ${metric})`)
    
//     return EXPORTS
// }




// products for pos table

export async function createProductTable() {

    db.query(`CREATE TABLE IF NOT EXISTS 
    products(
        id BIGSERIAL PRIMARY KEY,
        product VARCHAR REFERENCES item(product) ON DELETE CASCADE ON UPDATE CASCADE,
        price INTEGER  NOT NULL DEFAULT 0,
        category VARCHAR NOT NULL, 
        quantity INTEGER DEFAULT 0,
        department VARCHAR REFERENCES dept(department) ON DELETE NO ACTION ON UPDATE NO ACTION,
        date DATE NOT NULL DEFAULT CURRENT_DATE
    )`, 
    (err, result) =>{
        if(err) return console.error(err.message);
        return result
    })
}


export async function reduce_item_quantity(products:string, quantity:number){
    let product = await db.query(SQL ` UPDATE item SET quantity = ${quantity} WHERE product = ${products}; `)
    return product

}

export async function send_products_to_department(product:string, department:string, quantity:number, category:string, price:number) {
    let result = await db.query(SQL ` INSERT INTO products(product, department, quantity, category, price)
        VALUES(${product}, ${department}, ${quantity}, ${category}, ${price});`)
    return result;
}


export async function get_all_sent_items() {
    const items = await db.query(SQL` SELECT * FROM products WHERE DATE = CURRENT_DATE`)
    return items
}

export async function get_date(from:string, to:Date) {
    const DATE = await db.query(SQL ` SELECT * FROM products WHERE date BETWEEN ${from} AND ${to} `)
    return DATE
}

