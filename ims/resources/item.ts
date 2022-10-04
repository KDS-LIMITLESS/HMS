import { Request, Response } from 'express';
import { send_items_to_depts, get_departments } from '../models/item';


export async function sendItemsToDepartments(req:Request, res:Response) {
    let dept = await send_items_to_depts(req.body.item, req.body.department, req.body.quantity,
        req.body.size, req.body.metric)
    if (dept.rowCount >=1) return res.status(200).send(`OK`)
    return res.status(400).send(`An error occured!`)
}

export async function getDepartments(req:Request, res:Response) {
    let dept = await get_departments()
    return res.status(200).send(dept.rows)
}