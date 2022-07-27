import { grant_credit, get_admin_users, get_credit_status, update_credit_status } from "../models/credit"
import { get_admin_user } from "../models/user";
import { Request, Response } from "express"

export async function setStaffCreditLimit(req:Request, res: Response) {
   //  const ROLES = ['Admin', 'Super Admin', 'Auditor']
   //  const isUserAdmin = await get_admin_user(req.body.activeUser)
   //  console.log(isUserAdmin.rows)
   //  
   //  if (isUserAdmin.rows[0]['role'] != ROLES.includes(isUserAdmin.rows[0]['role'])){
   //      return res.status(200).send(`Who are You?`)
   //  }

    const CREDIT_STATUS = await get_credit_status(req.body.username);
    let creditRemaining;
    if (CREDIT_STATUS.rowCount === 1){
        req.body.opening_credit += CREDIT_STATUS.rows[0]['opening_credit']
        creditRemaining = req.body.opening_credit - CREDIT_STATUS.rows[0]['credit_granted']
        await update_credit_status(req.body.username, req.body.opening_credit, creditRemaining)
        return res.status(200).send(`OK`)
    }
    creditRemaining = req.body.opening_credit 
    await grant_credit(req.body.username, req.body.opening_credit, creditRemaining)
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
        return res.status(200).json({
            credit_remaining: user.rows[0]['credit_remaining'],
            opening_credit: user.rows[0]['opening_credit'],
            credit_granted: user.rows[0]['credit_granted']
        })
    }
    return res.status(400).send(`Null`)
}