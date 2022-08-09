import { db } from '../connection'
import { SQL } from 'sql-template-strings'


export async function create_notifications_table() {
    return await db.query(`CREATE TABLE IF NOT EXISTS notification(
        id BIGSERIAL PRIMARY KEY,
        waiter VARCHAR NOT NULL REFERENCES users(username),
        item VARCHAR NOT NULL,
        quantity INTEGER NOT NULL,
        status VARCHAR DEFAULT 'UNREAD'
    )`)
}

export async function send_notification(waiter: string, item: string, quantity: number) {
    let query = await db.query(SQL` INSERT INTO notification (waiter, item, quantity)
        VALUES (${waiter}, ${item}, ${quantity})`)
    return query
}

export async function update_notification_status(status: string, waiter: string) {
    let message = await db.query(SQL ` UPDATE notificatons SET status = ${status} 
        WHERE  waiter = ${waiter}`)
    return message;
}

export async function get_notifications(status:string, waiter:string) {
    let notification = await db.query(SQL `SELECT item, quantity FROM notification WHERE status = ${status} 
        AND waiter = ${waiter} `)
    return notification;
}

export async function get_waiter_notification() {
    let waiter = await db.query(`SELECT waiter FROM notification`)
    return waiter
}