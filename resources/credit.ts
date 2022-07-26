import { grant_credit, get_admin_users, get_credit_status } from "../models/credit"
import { Request, Response } from "express"

export async function grantStaffCredit(req:Request, res: Response) {
    await grant_credit(req.body.username, req.body.amount)
    return res.status(200).send(`DONE`)
}

export async function getcreditStatus(req: Request, res: Response) {
    let users = await get_admin_users();

    if(users.rowCount >= 1){
        return res.status(200).send(users.rows);
    }
    return res.status(404).send(`Not Found!`)
}

export async function UserCreditStatus(req:Request, res: Response) {
    let user = await get_credit_status(req.body.activeUser)
    if (user.rowCount >= 1) {
        return res.status(200).send(user.rows)
    }
    return res.status(400).send(`Null`)
}