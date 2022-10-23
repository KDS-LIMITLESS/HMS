import { Request, Response } from 'express'
import { get_all_items_sent_to_department, get_date,
    get_all_sent_items, delete_transaction } from '../models/transaction';
import { get_product_in_department, update_item_in_pos } from '../models/item';


export async function getAllItemsSent(req:Request, res:Response) {
    let items = await get_all_sent_items();
    return res.status(200).send(items.rows)
}

export async function getAllItemsSentToDepartment(req:Request, res:Response) {
    let items = await get_all_items_sent_to_department(req.body.department);
    return res.status(200).send(items.rows)
}

export async function getTransactionDates(req:Request, res:Response) {
    let date = await get_date(req.body.from, req.body.to)
    console.log(req.body)
    if (date) return res.status(200).json({filters: date.rows, count: date.rowCount})
    return res.status(400).send("Transactions within the specified date does not exist")
}

export async function deleteTransaction(req:Request, res:Response) {
    let transaction = await delete_transaction(req.body.id)
    if (transaction.rowCount === 1){
        // get the product from database
        let product = await get_product_in_department(req.body.product, req.body.department)
        // do the subtraction 
        let quantity = product.rows[0]['quantity'] - transaction.rows[0]['quantity'] 
        // update the database of the product to take the new figure
        await update_item_in_pos(req.body.product, quantity, req.body.department, req.body.price)
        
        return res.status(200).send(` Transaction Deleted Successfully!`)
    }
}