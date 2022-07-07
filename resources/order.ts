import { Response, Request } from "express";
import { new_order } from "../models/order";
import { get_product_price } from "../models/item";
import { get_table } from "../models/table";


export async function placeOrder(req: Request, res: Response){
    let time = new Date();

    const ORDER: [] = req.body.order;
    ORDER.forEach(o => {
        console.log(o)
    })

    console.log(`after order`)
    
    try {
        let price = await get_product_price(req.body.item)
        let table = await get_table(req.body.table_name)
        console.log(price)

        console.log(price  + '' + table + " Table and price")

        if (price && table){
            console.log(`price and table exists!`)

            //await new_order(req.body.activeUser, req.body.item, price, 
            //    req.body.quantity, req.body.total_amount, table, time.toLocaleTimeString()
            //)
            console.log(`new order created!`)
            return res.status(200).send(` OK `);
        }
        return res.status(400).send(`An error occured`);        

    }catch(err: any) {
        console.error(err.message + " Error from creating new order")
        return res.status(400).send("Please login to continue")
    }
}

// get all waiters tables
//jwts

// notification
// printing dockets
// logout 
// splitting orders into a transaction
// printing dockets


// make table Database ---> tableName, 
// order table will now have a tablename which is unique
