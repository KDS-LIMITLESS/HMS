import { place_order, update_order_status, get_order_by_status, 
    get_all_order, get_orders_by_date, get_cancelled_orders, 
    get_received_orders, update_received_order_quantity, 
    get_one_order, total_placed_orders, count_cancelled_order,
    count_received_order }from '../models/order';

import { add_item, get_item, update_item_quantity } from '../../models/item';
import { Request, Response } from 'express'


export async function placeOrder(req:Request, res:Response) {

    console.log(req.body);

    const order = await place_order(req.body.product, req.body.qty, req.body.size, req.body.metric, 
        req.body.unitPrice)
    if (order.rowCount >= 1) return res.status(200).send(`OK`)
    return res.status(400).send(` An error happened! `)

}

export async function updateOrderStatus(req:Request, res:Response) {
    console.log(req.body)

    const status = await update_order_status(req.body.product, req.body.status)
    if (status.rowCount >= 1) return res.status(200).send(`OK`)
    return res.status(400).send(`Error`)
}


// export async function updateOrderStatustest(req:Request, res:Response) {
//     const  reqBody = req.body

//     const status = await update_order_status(req.body.item, req.body.status)
//     if (status.rowCount >= 1){
//         if (req.body.status === 'RECEIVED') {
//             const item = await get_item(req.body.item)
//             if(item.rowCount >= 1) {
//                 await update_item_quantity(req.body.product, req.body.quantity)  // function in pos models/item
//                 return res.status(200).send(`item quantity updated`)
//             } 
//             await add_item(reqBody['product'], reqBody['quantity'], 
//             reqBody['image'], reqBody['size'], reqBody['metric'], reqBody['reorder'])

//             return res.status(200).send(` item added successfully`)
//         }
//         return res.status(200).send(`OK`)
        
//     } 
//     return res.status(400).send(`Error`)
// }

export async function getOrders(req:Request, res:Response) {
    
    console.log(req.body)

    const orders = await get_order_by_status(req.body.status)
    if (orders.rowCount > 0) return res.status(200).json({filters: orders.rows, count: orders.rowCount})
    return res.status(400).send(`None`)

}

export async function getAllOrders(req:Request, res:Response) {
    
    console.log(req.body)

    const orders = await get_all_order()
    if (orders.rowCount > 0) return res.status(200).send(orders.rows)
    return res.status(400).send(`No Orders`)

}

export async function getOrderTransactionByDates(req:Request, res:Response) {
    let date = await get_orders_by_date(req.body.from, req.body.to)
    if (date) return res.status(200).json({filters: date.rows, count: date.rowCount })
    return res.status(400).send("Transactions within the specified date does not exist")
}

export async function getCancelledOrders(req:Request, res:Response) {
    let orders = await get_cancelled_orders()
    if (orders) return res.status(200).json({filters: orders.rows, count: orders.rowCount})
}

export async function getReceivedOrders(req:Request, res:Response) {
    let orders = await get_received_orders()
    if (orders) return res.status(200).json({filters: orders.rows, count: orders.rowCount})
}

export async function updateReceivedOrderQuantity(req:Request, res:Response) {
    let item = await get_one_order(req.body.item)
    if (item.rowCount >= 1) {
        let orders = await update_received_order_quantity(req.body.qty, req.body.item)
        return res.status(200).send(`Quantity updated successfully`)
    }
    
}

export async function getPlaceOrderTotal(req:Request, res:Response) {
    let total = await total_placed_orders()
}

export async function countReceivedOrders(req:Request, res:Response) {
    let count = await count_received_order()
    return res.status(200).send(count.rows[0])
}

export async function countCancelledOrders(req:Request, res:Response) {
    let count = await count_cancelled_order()
    return res.status(200).send(count.rows[0])
}