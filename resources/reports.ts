import { Request, Response } from "express";
import { get_waiters, get_items, get_distinct_items } from "../models/reports";


export async function report(req: Request, res: Response) {
   let waiters =  await get_waiters();
   if (waiters.rowCount > 0)  return res.status(200).send(waiters.rows);
   return res.status(400).send(` none `)
}

export async function getItemReports(req:Request, res:Response) {
   let items = await get_items(req.body.waiter)
   if (items.rowCount > 0) return res.status(200).send(items.rows)
   return res.status(400).send('none')
}