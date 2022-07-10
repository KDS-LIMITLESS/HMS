import { Response, Request, NextFunction } from "express";
import { get_item } from "../models/item";
import {new_order, get_table_orders, get_drinks_in_table, 
    update_order_quantity } from "../models/order";
import { delete_rows } from "../models/table";

export async function placeOrder(req: Request, res: Response, next: NextFunction){
    let time = new Date();    
       
    console.log(req.body.order)
    const ORDER: [] = req.body.order;
    let order;
    ORDER.forEach(async order => {
       let item = await get_item(order['item']['product'])
       console.log(order['item']['product'])
        
       
       // Delete table in table databases if error occurs here
       // make serial data type count sequentially

        console.log(item)
        if (item === null) {
            await delete_rows(req.body.table_name)
            console.log(' deleted table')
            return res.status(400).end(`Item does not exist`)
        } else {
            await new_order(req.body.activeUser, order['item']['product'], 
                order['item']['price'], order['quantity'], order['item']['category'],  
                order['item']['image'], req.body.total, req.body.table_name,
                req.body.paymentMethod, time.toLocaleTimeString()
            )
        }
    });
    console.log(`new order created!`)
    res.status(200).send('OK');  
}

export async function getOpenOrders(req: Request, res: Response) {
    let order = await get_table_orders(req.body.activeUser, req.body.table_name);
    if (!order) return res.status(400).send(`table not found`)
    console.log(req.body)
    let i: any[] = []
    order?.forEach((item) => {
        
        let items = {
            "quantity": item.quantity,
            "item": {
                "product": item.item,
                "price": item.price,
                "category": item.category,
                "image": item.image
            }
        }
        
        i.push(items)
    })
    console.log(i)
    return res.status(200).send(i)   
}


// add item does not exist error check in this function
// price should be read from database

export async function updateOrder(req: Request, res: Response) {
    let time = new Date()
    
    const ORDER: [] = req.body.order;
    let update;
    let newOrder;
    
    ORDER.forEach(async order => {
    
        let item = await get_drinks_in_table(order['item']['product'], req.body.table_name)
        console.log(item.rowCount)
        if (item.rowCount !== 0 ) {
             update = await update_order_quantity(order['item']['product'], 
                                     order['quantity'], req.body.table_name)
        } else { 
             newOrder = await new_order(req.body.activeUser, order['item']['product'], 
                 order['item']['price'], order['quantity'], order['item']['category'],  
                 order['item']['image'], req.body.total, req.body.table_name,
                 req.body.paymentMethod, time.toLocaleTimeString()
            ); 
        }
    });
    if (update === 0 || newOrder === 0) return res.status(400).send(`an error occured`)
    return res.end(`OK`);
}



// cors should only direct to the frontend
// order status
// update item prices
// splitting orders into a transaction

// notification
// jwts
// logout 
// printing dockets
// super admin dashboard

    //  *********** //

// get all waiters tables
// update drinks in db done




 
// strong man creates good times, goot times creates weak men, weak men creates bad time