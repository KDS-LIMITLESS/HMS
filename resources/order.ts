import { Response, Request } from "express";
import { new_order } from "../models/order";
import { get_product_price, get_item } from "../models/item";
import { get_table } from "../models/table";


export async function placeOrder(req: Request, res: Response){
    let time = new Date();    
    try {
       
        const ORDER: [] = req.body.order;
        ORDER.forEach(async order => {
            let item = await get_item(order['item']['product'])
            if (!item) return res.status(400).send(`Item does not exist`)
            
            // let productPrice = get_product_price()
            
            console.log(order)
            console.log(order['quantity'])
            
            await new_order(req.body.activeUser, order['item']['product'], 
                order['item']['price'], order['quantity'], order['item']['category'],  
                order['item']['image'], req.body.total, req.body.table_name,
                req.body.paymentMethod, time.toLocaleTimeString()
            )
        })       
        console.log(`new order created!`)
        return res.status(200).send(` OK `);
    }catch(err: any) {
        console.error(err.message + " Error from creating new order")
        return res.status(400).send("Please login to continue")
    }
}

// get all waiters tables

// update item prices
//jwts

// notification
// printing dockets
// logout 
// splitting orders into a transaction
// printing dockets


// make table Database ---> tableName, 
// order table will now have a tablename which is unique
