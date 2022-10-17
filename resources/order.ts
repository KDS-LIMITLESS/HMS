import { Response, Request, NextFunction } from "express";
import { exit } from "process";
import {new_order, get_table_orders, get_drinks_in_table, 
    update_order_quantity, get_all_orders, delete_order, get_order,
    count_waiters_order, get_table_orders_for_admin,count_all_orders,
    decrease_item_quantity_in_pos } from "../models/order";
import { send_notification } from "../models/notifiacation";
import { get_product_in_department } from "../ims/models/item";
import { get_user } from "../models/user";


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
        let quantity = await get_product_in_department(order['product'], order['department'])
        let new_quantity = quantity.rows[0]['quantity'] - order['quantity']
        console.log(new_quantity)
        await decrease_item_quantity_in_pos(order['product'], new_quantity, order['department'])
        await send_notification(req.body.activeUser, order['product'], order['quantity'])   
    };
    console.log(`new order created!`)
    res.status(200).send('OK');  
}

// get order history within a table
export async function getTableOrders(req: Request, res: Response) {
    let TABLE_ORDERS;
    if (req.body.role === 'Super Admin' || req.body.role === 'Administrator' || req.body.role === 'Accounts' 
        || req.body.role === 'Supervisor' ){

        TABLE_ORDERS = await get_table_orders_for_admin(req.body.table_name)
        
    } else {
        TABLE_ORDERS = await get_table_orders(req.body.activeUser, req.body.table_name);
    }
    
    console.log(req.body)

    if (!TABLE_ORDERS) return res.status(400).send(`table not found`)
    
   
    // converting return type from db to [{}] required by the client.
    let notification: any[] = []
    let returned = 0
    TABLE_ORDERS?.forEach((item) => {
        
        let items = {
            // "username": item.username,
            "quantity": item.quantity,
            "returned": returned,
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
        console.log(req.body)
        if (item.rowCount !== 0 ) {
            let quantity = order['quantity'] + item.rows[0]['quantity']
            await update_order_quantity(order['product'], 
                                     quantity, req.body.table_name)
            // order derails to send to the bar man as notification
            
            let quantity1 = await get_product_in_department(order['product'], order['department'])
            let new_quantity = quantity1.rows[0]['quantity'] - order['quantity']
            console.log(new_quantity)
            await decrease_item_quantity_in_pos(order['product'], new_quantity, order['department'])
            await send_notification(req.body.activeUser, order['product'], order['quantity'])   
        } else {
            // item exists 
            // const TOTAL =  req.body.price*req.body.quantity
            await new_order(req.body.activeUser, order['product'], 
                order['price'], order['quantity'], order['category'],  
                order['image'], order['department'], 
                req.body.table_name,time.toLocaleTimeString()
            ); 

            let quantity = await get_product_in_department(order['product'], order['department'])
            let new_quantity = quantity.rows[0]['quantity'] - order['quantity']
            console.log(new_quantity)
            await decrease_item_quantity_in_pos(order['product'], new_quantity, order['department'])
            
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
        let user = await get_user(req.body.activeUser)
        if (user.rows[0]['role'] === 'Super Admin') {
            let count = await count_all_orders()
            return res.status(200).json({order_count: count.rows})
        }
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
    let quantity;
    let new_quantity: any;
    console.log(JSON.stringify(req.body))

    for (order of ORDER) {
        console.log(JSON.stringify(req.body.order.returned))
        let item = await get_drinks_in_table(order['item']['product'], req.body.table_name)        
        if (item.rowCount !== 0 && req.body.order.returned > 0) {

            console.log(JSON.stringify((req.body.product, req.body.returned)))
            await update_order_quantity(order['item']['product'], 
                order['quantity'], req.body.table_name)

            quantity = await get_product_in_department(order['item']['product'], order['item']['department'])
            console.log(quantity.rows)
            new_quantity = quantity.rows[0]['quantity'] + req.body.returned
            
            await decrease_item_quantity_in_pos(order['item']['product'], new_quantity, order['item']['department'])
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


// async function reduceQuantity() {
//     let order:any ;
//     let quantity = await get_product_in_department(order['item']['product'], order['department'])
//     let new_quantity = quantity.rows[0]['quantity'] - order['item']['quantity']
//     return new_quantity
// }