import { Request, Response } from 'express'
import { get_all_items_sent_to_department, get_date,
    get_all_sent_items } from '../models/transaction';


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