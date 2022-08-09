import { Request, Response } from 'express'
import { get_notifications } from '../models/notifiacation'


export async function notifications(req:Request, res: Response) {
    let notification = await get_notifications('UNREAD')
    if (notification.rowCount > 0 ) return res.status(200).send(notification.rows)
    return res.status(400).send(`None`)
}