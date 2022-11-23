import { db } from '../../connection'
import SQL from 'sql-template-strings'


export async function create_notifications_table() {
    return await db.query(`CREATE TABLE IF NOT EXISTS notificationMSG(
        id BIGSERIAL PRIMARY KEY,
        notification TEXT
    )`)
}


export async function new_notification(notification:string) {
    let text = await db.query(`INSERT INTO notificationMSG(notification)
        VALUES (${notification});`)
    return text                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
}