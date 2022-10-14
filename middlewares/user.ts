import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { get_user, get_passcode } from "../models/user";
import { get_credit_balance, calculate_credit_balance, get_credit_status } from "../models/credit";


export interface IRequest extends Request {
    user: any;
}

export interface IResponse extends Response {
    user: any;
}


export async function authorizeUser(req:Request, res:Response, next:NextFunction){
    
    try {
        let userExists = await get_user(req.body.activeUser)
        
        if (userExists && (req.body.activePasscode === userExists.rows[0]['passcode'])){
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

export async function authorizeStoreManager(req: Request, res: Response, next: NextFunction){
    const personnels = ['Store Manager', "Supervisor", "Super Admin", "Admin"]
    
    try {
        
        let userExists = await get_user(req.body.activeUser)
       
        if (userExists && personnels.includes(userExists.rows[0]['role']) 
            && (req.body.activePasscode === userExists.rows[0]['passcode']) 
        ) {
            next();
        } else {
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
    const USERS = ['Auditor', 'Super Admin', 'Supervisor', 'Bar Man']
    try {
        let userExists = await get_user(req.body.activeUser)
        if (userExists && USERS.includes(userExists.rows[0]['role']) 
                 && (req.body.activePasscode === userExists.rows[0]['passcode']) 
            ) 
        {
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
    try {
        let userExists = await get_passcode(req.body.passcode)
        
        if (req.body.complimentary_qty !== 0 || req.body.discount !== 0 ){
            const USERS = ['Auditor', 'Super Admin', 'Admin']
            if (userExists?.rowCount === 1 && USERS.includes(userExists?.rows[0]['role'])){
                next();

            } else {
                console.log(userExists?.rows)
                return res.status(401).send(`Not Authorized`)
            }

        } else {
            console.log('finally')
            next();
        }

    }catch(err) {
        console.log(err);
        return res.status(500).send("An error Occured!")
    }     
}

export async function authorizeCredit(req: Request, res:Response, next:NextFunction){
    if (req.body.credit !== 0){
        
        try{ 
            const USERS = ['Auditor', 'Supervisor', 'Super Admin']
            let userExists = await get_passcode(req.body.passcode)
            const USER_HAS_CREDIT = await get_credit_status(userExists?.rows[0]['username'])
        

            if ( USER_HAS_CREDIT.rows[0]['credit_remaining'] >= req.body.credit){
            // subtract credit from credit remaining
            // console.log(USER_HAS_CREDIT.rows[0]['credit_remaining'] >= req.body.credit)
            // console.log(USER_HAS_CREDIT.rows[0]['credit_remaining'])

            let credit_granted = USER_HAS_CREDIT.rows[0]['credit_granted'] + req.body.credit
            let remaining_credit = USER_HAS_CREDIT.rows[0]['credit_remaining'] - req.body.credit
            
            await calculate_credit_balance(userExists?.rows[0]['username'], 
                remaining_credit, credit_granted)
            next();

            } else {
                console.log(req.body)
                return res.status(401).send(`Credit limit is too low`)
            }
        } catch (e: any) {
            console.log(e.message);
            return res.status(400).send(e.message)
        }
        
    } else {
        next();
    }
}

export async function checkIsUserSuspended(req:Request, res: Response, next: NextFunction) {
    let user = await get_user(req.body.username)
    if (user?.rowCount === 1 && user.rows[0]['status'] === 'SUSPENDED') {
        return res.status(401).send(`You have been suspended!`)
    }
    next();
    
}

export class Tokens {

    async generateAuthToken(username:string, role: string, passcode: number): Promise<string> {
        return jwt.sign({username, role, passcode}, process.env.JWT_SECRET_TOKEN as string , {expiresIn: '1h'})
    }

    async authenticateAuthToken(req:IRequest, res:Response, next:NextFunction) {
        console.log(req.headers)
        if (!req.headers.authorization) {
            return res.status(401).json({message: "Authorization required"});
        } 
        let splittedHeader = req.headers.authorization.split(' ');
        
        if (splittedHeader[ 0 ] !== "Bearer") {
            return res.status(401).json({ message: "auth format is Bearer <token>" })
        }
        let token = splittedHeader[ 1 ];
        
        try{
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN as string );
            console.log(decodedToken)
            req.user = decodedToken
            next();
        }
        catch(err: any){
            res.status(401).send(err.message)
        }
        
    }
}