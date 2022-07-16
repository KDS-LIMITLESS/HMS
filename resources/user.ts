import bcrypt from 'bcrypt'
import { get_user, create_new_user } from "../models/user";
import { Response, Request } from "express";

export async function newUser(req: Request, res: Response) {
    let userExists = await get_user(req.body.username)

    // console.log(userExists?.rows[0]['username'])

    if (userExists) return res.status(400).send(`User ${req.body.username} already exists.`)
    try{
        const PSW = await bcrypt.hash(req.body.password, 12)
        await create_new_user(req.body.username, PSW, req.body.passcode, req.body.role)
        return res.status(200).json({success: `User created successfully!`})

    }catch(err){
        console.error(err)
        return res.status(500).send('An error occured!')
    }
};

export async function login(req:Request, res:Response) {
    let userExists = await get_user(req.body.username)

    const PSW = bcrypt.compare(req.body.password, userExists?.rows[0]['password'])
    
    if (userExists && await PSW) {
        
        return res.status(200).send(`${userExists.rows[0]['username']}, 
            ${userExists.rows[0]['role']}, ${userExists.rows[0]['passcode']} `)
    }
    console.log(JSON.stringify(req.body) + " Invalid login details")
    return res.status(400).send(`Invalid login details`);
}

export async function checkPasscode(req: Request, res: Response){
    let userExists = await get_user(req.body.username)
    try {
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