import { place_order, update_order_status }from '../models/order';
import { Request, Response } from 'express'


export async function placeOrder(req:Request, res:Response) {

    console.log(req.body);

    const order = await place_order(req.body.item, req.body.qty, req.body.size, req.body.metric, 
        req.body.unitPrice, req.body.totalPrice, req.body.status, req.body.date)
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

export async function name(req:Request, res:Response) {
    
    console.log(req.body)

}