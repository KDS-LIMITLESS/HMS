import { Response, Request } from "express";
import { new_order } from "../models/order";
import { get_product_price } from "../models/item";


export async function placeOrder(req: Request, res: Response){
    let time = new Date();
    console.log(req.body)
    
    try {
        let price = await get_product_price(req.body.item)
        console.log(price)
        if (price){
            await new_order(req.body.activeUser, req.body.item, price, 
                req.body.quantity, req.body.total_amount, req.body.table_name, time.toLocaleTimeString()
            )
            return res.status(200).send(` OK `);
        }
        return res.status(400).send(`Item does not exist`);        
    }catch(err: any) {
        console.error(err.message)
        return res.status(400).send("Please login to continue")
    }
}

// get all waiters tables

// notification
// printing dockets
// logout 
// splitting orders into a transaction
// printing dockets


// make table Database ---> tableName, 
// order table will now have a tablename which is unique
