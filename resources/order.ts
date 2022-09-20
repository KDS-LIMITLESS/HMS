import { Response, Request, NextFunction } from "express";
import { exit } from "process";
import { get_item } from "../models/item";
import {new_order, get_table_orders, get_drinks_in_table, 
    update_order_quantity, get_all_orders, delete_order, get_order,
    count_waiters_order, get_table_orders_for_admin} from "../models/order";
import { send_notification } from "../models/notifiacation";


export async function placeOrder(req: Request, res: Response, next: NextFunction){
    let time = new Date();    
       
    const ORDER: [] = req.body.order;
    
    for (const order of ORDER) {
        console.log(order)
        await new_order(req.body.activeUser, order['product'], 
            order['price'], order['quantity'], order['category'],  
            order['image'], order['department'], req.body.table_name,
            time.toLocaleTimeString()
        )
        await send_notification(req.body.activeUser, order['product'], order['quantity'])   
    };
    console.log(`new order created!`)
    res.status(200).send('OK');  
}

// get order history within a table
export async function getTableOrders(req: Request, res: Response) {
    let TABLE_ORDERS;
    if (req.body.role === 'Super Admin' || req.body.role === 'Auditor' || req.body.role === 'Accounts' ){
        TABLE_ORDERS = await get_table_orders_for_admin(req.body.table_name)
    
    } else {
        TABLE_ORDERS = await get_table_orders(req.body.activeUser, req.body.table_name);
    }

    if (!TABLE_ORDERS) return res.status(400).send(`table not found`)
    
   
    // converting return type from db to [{}] required by the client.
    let notification: any[] = []
    TABLE_ORDERS?.forEach((item) => {
        
        let items = {
            // "username": item.username,
            "quantity": item.quantity,
            "item": {
                "product": item.item,
                "price": item.price,
                "category": item.category,
                "image": item.image,
                "department": item.department
            }
        }
        
        notification.push(items)
    })
    return res.status(200).send(notification)   
}

// check if table is closed and do not do anything.....
export async function updateOrder(req: Request, res: Response) {
    let time = new Date()
    const ORDER: [] = req.body.order;
    // check if table exists
    for (const order of ORDER) {
        let item = await get_drinks_in_table(order['product'], req.body.table_name)
        if (item.rowCount !== 0 ) {
            let quantity = order['quantity'] + item.rows[0]['quantity']
            await update_order_quantity(order['product'], 
                                     quantity, req.body.table_name)
            // order derails to send to the bar man as notification
            await send_notification(req.body.activeUser, order['product'], order['quantity'])   
        } else {
            // item exists 
            const TOTAL =  req.body.price*req.body.quantity
            await new_order(req.body.activeUser, order['product'], 
                order['price'], order['quantity'], order['category'],  
                order['image'], order['department'], 
                req.body.table_name,time.toLocaleTimeString()
            ); 
            await send_notification(req.body.activeUser, order['product'], order['quantity'])   
        }
    };
    return res.json(`OK`)
}

export async function getAllOrder(req:Request, res: Response) {
    try {
        const ORDERS = await get_all_orders()
        return res.status(200).send(ORDERS.rows)
    }catch(err:any){
        console.log(err.message)
        return res.status(400).send(`An error occured`)
    }
}

export async function countWaitersOrder(req: Request, res: Response) {
    try {
        let count = await count_waiters_order(req.body.activeUser)
        return res.status(200).json({Waiter_count: count.rowCount})
    }catch(err: any){
        console.log(err.message)
        return res.status(400).send(err.message)
    }
}

export async function removeOrdersFromTable(req: Request, res: Response) {
    
    const ORDER: [] = req.body.order
    let order;
    console.log(req.body)
   
    for (order of ORDER) {
        
        let item = await get_drinks_in_table(order['item']['product'], req.body.table_name)        
        if (item.rowCount !== 0 ) {
            await update_order_quantity(order['item']['product'], 
                order['quantity'], req.body.table_name)
        }
    }
    return res.status(200).send(`OK`)
}

export async function deleteOrder(req:Request, res:Response) {
    let order = await get_order(req.body.table_name, req.body.product);
    if (order.rowCount === 1){
        await delete_order(req.body.table_name, req.body.product)
        return res.status(200).send(`OK`)
    }
    return res.status(400).send(`ERROR!`)
}
