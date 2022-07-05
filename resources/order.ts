import { Response, Request } from "express";
import { new_order } from "../models/order";
import { get_product_price } from "../models/item";


export async function placeOrder(req: Request, res: Response){
    let time = new Date();
    
    try {
        let price = await get_product_price(req.body.item)
        console.log(price)
        if (price){
            await new_order(req.body.username, req.body.item, price, 
                req.body.quantity, req.body.total_amount, time.toLocaleTimeString()
            )
            return res.status(200).send(` OK `);
        }
        return res.status(400).send(`Item does not exist`);        
    }catch(err: any) {
        console.error(err.message)
        return res.status(400).send("Please login to continue")
    }
}

// notification
// printing dockets
// logout 
// splitting orders into a transaction
// check which user from passcode
