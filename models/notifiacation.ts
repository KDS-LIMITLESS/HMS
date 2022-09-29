import { db } from '../connection'
import { SQL } from 'sql-template-strings'


export async function create_notifications_table() {
    return await db.query(`CREATE TABLE IF NOT EXISTS notification(
        id BIGSERIAL PRIMARY KEY,
        waiter VARCHAR REFERENCES users(username) ON DELETE SET NULL,
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
    let message = await db.query(SQL`UPDATE notification SET status = ${status} 
        WHERE  waiter = ${waiter}`)
    return message;
}

export async function get_notifications(waiter:string) {
    let notification = await db.query(SQL `SELECT item, quantity, status FROM notification 
        WHERE waiter = ${waiter}`)
    return notification;
}

export async function get_waiter_notification() {
    let waiter = await db.query(SQL ` SELECT DISTINCT waiter, status FROM notification `)
    return waiter
}

export async function get_unread_notification_count(status:string) {
    let count = await db.query(SQL `SELECT waiter, item, status FROM notification 
        WHERE status = ${status}`)
    return count
}

export async function delete_all_notifications() {
    const notification = await db.query(SQL `DELETE FROM notification `);
    return notification 
}