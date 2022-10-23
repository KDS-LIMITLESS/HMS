import { Request, Response } from 'express';
import { send_products_to_department,
    reduce_item_quantity, get_product_in_department, get_product_image,
    update_item_in_pos, delete_item, update_item_status } from '../models/item';
import { get_item } from '../../models/item';
import { get_item_in_orders } from '../../models/order';
import { record_transactions } from '../models/transaction';


export async function distributeItems(req:Request, res:Response) {
    const item = await get_item(req.body.product)
    let qty;
    
    if(item.rowCount  < 1){
        return res.status(400).send('Item not found!')
    }
    if (item.rows[0]['quantity'] === 0 || item.rows[0]['quantity'] < req.body.quantity) {
        return res.status(400).send(`item quantity too low in store`)
    }
    let image = await get_product_image(req.body.product)

    // find product in department 
    let product = await get_product_in_department(req.body.product, req.body.department)
    // if found update product, price and quantity

    
    if (product.rowCount >= 1){
        //add/update product quantity
        let product_quantity = product.rows[0]['quantity'] + req.body.quantity
        await update_item_in_pos(req.body.product, product_quantity, req.body.department, req.body.price)
        await record_transactions(req.body.product, req.body.department, req.body.quantity, 
            req.body.description, req.body.price
        )

        qty = item.rows[0]['quantity'] - req.body.quantity
        await reduce_item_quantity(req.body.product, qty)

        return res.status(200).send(`OK`)
        
    }else {
        await send_products_to_department(req.body.product, req.body.department, 
            req.body.quantity, image, req.body.category, req.body.price
        )  
        await record_transactions(req.body.product, req.body.department, req.body.quantity, 
            req.body.description, req.body.price
        ) 
        let qty = item.rows[0]['quantity'] - req.body.quantity
        await reduce_item_quantity(req.body.product, qty)
        return res.status(200).send(`${req.body.quantity} ${req.body.product} sent to ${req.body.department}`)
    }  
}

// ims function
export async function deleteItem(req: Request,res: Response){
    try {
        let item = await get_item_in_orders(req.body.product)
        if (item.rowCount >= 1 && item.rows[0]['status'] === 'FALSE') {
            // update the item status in items
            await update_item_status(req.body.product)
            // return a response of status set to delete
            return res.status(200).send("Item status updated")
        }
        const ITEM = await get_item(req.body.product)
        if (ITEM.rowCount === 1) {
            await delete_item(req.body.product)
            return res.status(200).send("Item deleted from database")
        }
        return res.status(400).send(`Error. Item does not exist.`)
    } catch(err: any) {
        return res.status(400).send(err.message)
    }
}
