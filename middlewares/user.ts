import { Response, Request, NextFunction } from "express";
import { get_user } from "../models/user";


export async function authorizeUser(req:Request, res:Response, next:NextFunction){
    try {
        let userExists = await get_user(req.body.username)
        if (userExists && (req.body.passcode === userExists?.rows[0]['passcode'])){
            next();
        } else {
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