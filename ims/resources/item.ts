import { Request, Response } from 'express';
import { get_all_sent_items, get_date, send_products_to_department,
    reduce_item_quantity } from '../models/item';
import { get_item } from '../../models/item';


// export async function sendItemsToDepartments(req:Request, res:Response) {
//     let item = await get_item(req.body.item, req.body.product)
//     if (item) {
//         let dept = await send_items_to_depts(req.body.item, req.body.department, req.body.quantity,
//             req.body.size, req.body.metric)
//         if (dept.rowCount >= 1) return res.status(200).send(`OK`)
//         return res.status(400).send(`An error occured!`)
//     } 
//     else{
//         return res.status(404).send(`item not found in specified department`)
//     }
// }

export async function distributeItems(req:Request, res:Response) {
    const item = await get_item(req.body.product)
    console.log(req.body)
    
    if (item.rows[0]['quantity'] === 0 || item.rows[0]['quantity'] < req.body.quantity){
        return res.status(400).send('Item quantity in store is too low')
    }
    await send_products_to_department(req.body.product, req.body.department, 
        req.body.quantity, req.body.price
    )
   
    let quantity = item.rows[0]['quantity'] - req.body.quantity
    console.log(quantity)
    await reduce_item_quantity(req.body.product, quantity)
    return res.status(200).send(`${req.body.quantity} ${req.body.product} sent to ${req.body.department}`)
}

export async function getAllItemsSent(req:Request, res:Response) {
    let items = await get_all_sent_items();
    return res.status(200).send(items.rows)
}

export async function getTransactionDates(req:Request, res:Response) {
    let date = await get_date(req.body.from, req.body.to)
    console.log(req.body)
    if (date) return res.status(200).send(date.rows)
    return res.status(400).send("Transactions within the specified date does not exist")
}

export async function name(req:Request, res:Response) {
    
}