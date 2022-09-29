import { place_order }from '../models/order';
import { Request, Response } from 'express'


export async function placeOrder(req:Request, res:Response) {

    console.log(req.body);

}

export async function updateOrderStatus(req:Request, res:Response) {
    console.log(req.body)
}

// export async function cancelOrder(req:Request, res:Response) {
    
//     console.log(req.body)

// }

export async function name(req:Request, res:Response) {
    
    console.log(req.body)

}