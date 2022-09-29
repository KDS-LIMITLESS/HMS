import { Request, Response } from 'express'
import { get_notifications, get_waiter_notification, update_notification_status,
    get_unread_notification_count, delete_all_notifications } from '../models/notifiacation'


export async function notifications(req:Request, res: Response) {
    let notification = await get_notifications('UNREAD', req.body.waiter)
    if (notification.rowCount > 0 ) return res.status(200).send(notification.rows)
    return res.status(400).send(`None`)
}


// list of all waiters names that placed orders
export async function waiters(req: Request, res: Response) {
    let waiter = await get_waiter_notification("UNREAD");
    if (waiter.rowCount > 0) return res.status(200).send(waiter.rows)
    return res.status(400).send(`none`)
}

export async function updateNotificationStatus(req:Request, res: Response) {
    let isWaiter = await update_notification_status("READ", req.body.waiter)
    if (isWaiter.rowCount === 0) return res.status(404).send(`No such user`)
    return res.status(200).send(`OK`)
}

export async function notificationCount(req:Request, res:Response) {
    let count = await get_unread_notification_count("UNREAD")
    if (count.rowCount > 0) return res.status(200).send(count.rows)
    res.status(400).send(`none`)
}

export async function clearNotifications(req:Request, res:Response) {
    let clear = await delete_all_notifications()
    if (clear.rowCount >= 1) return res.status(200).send(`OK`)
    res.status(400).send(`error`)
}