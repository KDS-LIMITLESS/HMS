import { Request, Response } from 'express';
import { send_items_to_depts, get_departments, get_all_sent_items, get_date } from '../models/item';
import { get_item } from '../../models/item';


export async function sendItemsToDepartments(req:Request, res:Response) {
    let item = await get_item(req.body.item, req.body.product)
    if (item) {
        let dept = await send_items_to_depts(req.body.item, req.body.department, req.body.quantity,
            req.body.size, req.body.metric)
        if (dept.rowCount >= 1) return res.status(200).send(`OK`)
        return res.status(400).send(`An error occured!`)
    } 
    else{
        return res.status(404).send(`item not found in specified department`)
    }
    
}

export async function getDepartments(req:Request, res:Response) {
    let dept = await get_departments()
    return res.status(200).send(dept.rows)
}

export async function getAllItemsSent(req:Request, res:Response) {
    let items = await get_all_sent_items();
    return res.status(200).send(items.rows)
}

export async function getTransactonDates(req:Request, res:Response) {
    let date = await get_date(req.body.from, req.body.to)
    if (date) return res.status(200).send(date.rows)
    return res.status(400).send("Transactions within the specified date does not exist")
}