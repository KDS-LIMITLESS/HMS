import { Request, Response } from 'express';
import { get_all_sent_items, get_date, send_products_to_department,
    reduce_item_quantity, get_product_in_department, get_product_image,
    update_item_in_pos} from '../models/item';
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
    
    // if (item.rows[0]['quantity'] === 0 || item.rows[0]['quantity'] < req.body.quantity)
    if(item.rowCount  < 1){
        return res.status(400).send('Item quantity in store is too low')
    }
    let image = await get_product_image(req.body.product)
    console.log(image)
    // find product in department 
    let product = await get_product_in_department(req.body.product, req.body.department)
    // if found update product, price and quantity
    if (product.rowCount >= 1){
        let update = await update_item_in_pos(req.body.product, req.body.quantity, req.body.price)
        return res.status(200).json({item: update.rows[0]})
    }
    await send_products_to_department(req.body.product, req.body.department, 
        req.body.quantity, image, req.body.category, req.body.price
    )   
    let quantity = item.rows[0]['quantity'] - req.body.quantity
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
    if (date) return res.status(200).json({filters: date.rows, count: date.rowCount})
    return res.status(400).send("Transactions within the specified date does not exist")
}

export async function name(req:Request, res:Response) {
    
}