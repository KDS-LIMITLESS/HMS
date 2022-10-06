import { place_order, update_order_status, get_order_by_status, get_all_order, get_orders_by_date }from '../models/order';
import { Request, Response } from 'express'


export async function placeOrder(req:Request, res:Response) {

    console.log(req.body);

    const order = await place_order(req.body.item, req.body.qty, req.body.size, req.body.metric, 
        req.body.unitPrice)
    if (order.rowCount >= 1) return res.status(200).send(`OK`)
    return res.status(400).send(` An error happened! `)

}

export async function updateOrderStatus(req:Request, res:Response) {
    console.log(req.body)

    const status = await update_order_status(req.body.item, req.body.status)
    if (status.rowCount >= 1) return res.status(200).send(`OK`)
    return res.status(400).send(`Error`)

}

// export async function cancelOrder(req:Request, res:Response) {
    
//     console.log(req.body)

// }

export async function getOrders(req:Request, res:Response) {
    
    console.log(req.body)

    const orders = await get_order_by_status(req.body.status)
    if (orders.rowCount > 0) return res.status(200).send(orders.rows)
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
    if (date) return res.status(200).send(date.rows)
    return res.status(400).send("Transactions within the specified date does not exist")
}