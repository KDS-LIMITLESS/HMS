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

export async function authorizeSuperAdmin(req: Request, res: Response, next: NextFunction){
    //let user: any
    
    try {
        let userExists = await get_user(req.body.username)
        if (userExists && (req.body.passcode === userExists.rows[0]['passcode']) && (req.body.role === 'Super Admin') ){
            next();
        } 
    }
    catch(err) {
        console.log(err);
        return res.status(500).send("An error Occured!")
    }
    return res.status(400).send("Please login to continue")    
}