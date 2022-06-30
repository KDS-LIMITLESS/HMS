import { Response, Request, NextFunction } from "express";
import { get_user } from "../models/user";


export async function authorizeUser(req:Request, res:Response, next:NextFunction){
    let user: any
    if (user in req){
        try {
            let userExists = await get_user(user['username'])
            if (userExists && (req.body.passcode === userExists?.rows[0]['passcode'])){
                next();
            } 
        }
        catch(err) {
            console.log(err);
            return res.status(500).send("An error Occured!")
        }
    }
    return res.status(400).send("Please login to continue")
}

export async function checkPasscode(req: Request, res: Response){
    //let user: any

    try {
        let userExists = await get_user(req.body.username)
        if (userExists && ( userExists.rows[0]['role'] === 'Super Admin') && (req.body.passcode === userExists.rows[0]['passcode'])){
            return res.status(200).send("OK") 
        } 
        console.log(JSON.stringify(req.body))
        return res.status(400).send("Please login to continue")
    }
    catch(err) {
        console.log(err);
        return res.status(500).send("An error Occured!")
    }
}

export async function authorizeSuperAdminNext(req: Request, res: Response, next: NextFunction){
    //let user: any

    try {
        let userExists = await get_user(req.body.activeUser)
        if (userExists && ( userExists.rows[0]['role'] === 'Super Admin') && (req.body.activePasscode === userExists.rows[0]['passcode']) ){
            next();
        } 
        console.log(req.body)
        return res.status(400).send("Please login to continue")
    }
    catch(err) {
        console.log(err);
        return res.status(500).send("An error Occured!")
    }  
}