import { Request, Response} from "express";
import { get_waiters, get_items, get_all_items_sold, clear_db, 
   filter_items, filter_waiter_items } from "../models/reports";


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

export async function generateOverallReport(req:Request, res:Response) {
   let items = await get_all_items_sold()
   if (items.rowCount > 0) return res.status(200).send(items.rows)
   return res.status(400).send('None')
}

export async function filterOverallReport(req:Request, res:Response) {
   let items = await filter_items(req.body.from, req.body.to)
   if (items.rowCount > 0) return res.status(200).send(items.rows)
   return res.status(400).send('None')
}

export async function filterIndividualReport(req:Request, res:Response) {
   console.log(req.body)
   let items = await filter_waiter_items(req.body.waiter, req.body.from, req.body.to)
   console.log(items.rows)
   if (items.rowCount > 0) return res.status(200).send(items.rows)
   return res.status(400).send('None')
}

export async function clearDbDetails(req:Request, res:Response) {
   const clear = await clear_db();
   if (clear) return res.status(200).send(`Database Wiped!`)
}