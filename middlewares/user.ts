import { Response, Request, NextFunction } from "express";
import { get_user, get_passcode } from "../models/user";


export async function authorizeUser(req:Request, res:Response, next:NextFunction){
    
    try {
        let userExists = await get_user(req.body.activeUser)
        
        if (userExists && (req.body.activePasscode === userExists.rows[0]['passcode'])){
            console.log(`calling next done...`)
            next();
        } else {
            console.log(JSON.stringify(req.body) + " Error from authorize User")
            return res.status(400).send("Please login to continue")
        }
    }
    catch(err) {
        console.log(err);
        return res.status(500).send("An error Occured!")
    }
}

export async function authorizeSuperAdminNext(req: Request, res: Response, next: NextFunction){
    try {
        let userExists = await get_user(req.body.activeUser)
        if (userExists && ( userExists.rows[0]['role'] === 'Super Admin') && (req.body.activePasscode === userExists.rows[0]['passcode']) ){
            console.log("calling Next")
            next();
        }else {
            console.log(req.body)
            return res.status(400).send("Please login to continue")
        }
    }
    catch(err) {
        console.log(err);
        return res.status(500).send("An error Occured!")
    }  
}

export async function authorizeAuditor(req: Request, res: Response, next: NextFunction){
    
    try {
        let userExists = await get_user(req.body.activeUser)
        if (userExists && ( userExists.rows[0]['role'] === 'Auditor' || userExists.rows[0]['role'] === 'Super Admin')
                 && (req.body.activePasscode === userExists.rows[0]['passcode']) 
            ) 
        {
            console.log("calling Next")
            next();
        }else {
            console.log(req.body)
            return res.status(400).send("Please login to continue")
        }
    }
    catch(err) {
        console.log(err);
        return res.status(500).send("An error Occured!")
    }  
}

export async function authorizeDiscount(req:Request, res:Response, next:NextFunction) {
    const USERS = ['Auditor', 'Super Admin', 'Admin']
    try {
        let userExists = await get_passcode(req.body.passcode)
        
        if ( req.body.credit !== 0 || req.body.complimentary_qty !== 0 || req.body.discount !== 0 ){
            if (userExists?.rowCount === 1 && USERS.includes(userExists.rows[0]['role'])){
                next();

            } else {
                console.log(req.body)
                return res.status(401).send(`Not Authorized`)
            }

        }else {
            console.log('finally')
            next();
        }

    }catch(err) {
        console.log(err);
        return res.status(500).send("An error Occured!")
    }     
}