import { Response, Request } from "express";
import { new_order } from "../models/order";
import { get_item } from "../models/item";
import { get_table_orders } from "../models/order";


export async function placeOrder(req: Request, res: Response){
    let time = new Date();    
    try {
       
        console.log(req.body.order)
        const ORDER: [] = req.body.order;
        ORDER.forEach(async order => {
            let item = await get_item(order['item']['product'])
            if (!item) return res.status(400).send(`Item does not exist`)
            
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

export async function getOpenOrders(req: Request, res: Response) {
    await get_table_orders(req.body.activeUser)
    .then((result) => {
        result?.forEach(x => {
            let order = {quantity: result}
        })
        
        console.log(``)
        return res.status(200).send(result)
    })
    .catch(err => {
        console.error(err.message)
        return res.status(400).send(err)
    })
}


// order status
// update item prices
// notification
// jwts
// logout 
// printing dockets
// super admin dashboard

    //  *********** //

// get all waiters tables

// splitting orders into a transaction


 
