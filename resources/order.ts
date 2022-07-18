import { Response, Request, NextFunction } from "express";
import { exit } from "process";
import { get_item } from "../models/item";
import {new_order, get_table_orders, get_drinks_in_table, 
    update_order_quantity, get_all_orders, delete_order,
    count_waiters_order, get_table_orders_for_admin} from "../models/order";


export async function placeOrder(req: Request, res: Response, next: NextFunction){
    let time = new Date();    
       
    console.log(req.body.order)
    const ORDER: [] = req.body.order;
    
    ORDER.forEach(async order => {
        await new_order(req.body.activeUser, order['item']['product'], 
            order['item']['price'], order['quantity'], order['item']['category'],  
            order['item']['image'], order['item']['department'], req.body.table_name,
            time.toLocaleTimeString()
        )
    });
    console.log(`new order created!`)
    res.status(200).send('OK');  
}

// get order history within a table
export async function getTableOrders(req: Request, res: Response) {
    let TABLE_ORDERS;
    if (req.body.role === 'Super Admin' || req.body.role === 'Auditor' ){
        TABLE_ORDERS = await get_table_orders_for_admin(req.body.table_name)
    
    } else {
        TABLE_ORDERS = await get_table_orders(req.body.activeUser, req.body.table_name);
    }

    if (!TABLE_ORDERS) return res.status(400).send(`table not found`)
    
   
    // converting return type from db to [{}] required by the client.
    let i: any[] = []
    TABLE_ORDERS?.forEach((item) => {
        
        let items = {
            "username": item.username,
            "quantity": item.quantity,
            "item": {
                "product": item.item,
                "price": item.price,
                "category": item.category,
                "image": item.image,
                "department": item.department
            }
        }
        
        i.push(items)
    })
    return res.status(200).send(i)   
}

// check if table is closed and do not do anything.....
export async function updateOrder(req: Request, res: Response) {
    let time = new Date()

    console.log(req.body)
    
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
            const TOTAL =  req.body.price*req.body.quantity
            // const PRODUCT_PRICE = await get_product_price(order['item']['product'])
            // add total and total amount
             
            newOrder = await new_order(req.body.activeUser, order['item']['product'], 
                 order['item']['price'], order['quantity'], order['item']['category'],  
                 order['item']['image'], order['item']['department'], req.body.table_name,time.toLocaleTimeString()
            ); 
        }
    });
    if (update === 0 || newOrder === 0) return res.status(400).send(`an error occured`)
    return res.end(`OK`);
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
    let time = new Date()

    console.log(req.body)
    
    const ORDER: [] = req.body.order;
    console.log(req.body)
    let order: any; 
    for (order in ORDER) {
    
        let item = await get_drinks_in_table(order['item']['product'], req.body.table_name)
        
        if (item.rowCount !== 0 ) {
            let update = await update_order_quantity(order['item']['product'], 
                order['quantity'], req.body.table_name)
            if (update.rows[0]['quantity'] === 1){
                await delete_order(req.body.table_name, order['item']['product'])
            }
        }
        
    }
}


// cors should only direct to the frontend
// order status table status
// add automatic total amount check 
// update item prices
// specify items for lounge and bar
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