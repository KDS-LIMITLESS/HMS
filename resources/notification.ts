import { Request, Response } from 'express'
import { get_notifications, get_waiter_notification } from '../models/notifiacation'


export async function notifications(req:Request, res: Response) {
    let notification = await get_notifications('UNREAD', req.body.waiter)
    if (notification.rowCount > 0 ) return res.status(200).send(notification.rows)
    return res.status(400).send(`None`)
}


// list of all waiters names that placed orders
export async function waiters(req: Request, res: Response) {
    let waiter = await get_waiter_notification();
    if (waiter.rowCount > 0) return res.status(200).send(waiter.rows)
    return res.status(400).send(`none`)
}