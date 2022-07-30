import bcrypt from 'bcrypt'
import { get_user, create_new_user, suspend_user, delete_user, 
    get_all_users, update_user_role, get_admins, update_user_password, update_user_passcode } from "../models/user";
import { Response, Request } from "express";

export async function newUser(req: Request, res: Response) {
    let userExists = await get_user(req.body.username)

    if (userExists.rowCount === 1)  return res.status(400).send(`User ${req.body.username} already exists.`)
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

    if ((userExists.rowCount === 1) && (await bcrypt.compare(req.body.password, userExists.rows[0]['password']))) {
        
        return res.status(200).json({username: userExists.rows[0]['username'], 
            passcode: userExists.rows[0]['passcode'], role: userExists.rows[0]['role']}); 
    }
    console.log(JSON.stringify(req.body) + " Invalid login details")
    return res.status(400).send(`Invalid login details`);    
}

export async function checkPasscode(req: Request, res: Response){
    let userExists = await get_user(req.body.username)
    try {
        if ((userExists.rowCount === 1) && ( userExists.rows[0]['role'] === 'Super Admin') && (req.body.passcode === userExists.rows[0]['passcode'])){
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

export async function suspendUser(req: Request, res: Response) {
    let findUser = await get_user(req.body.username);
    if (findUser.rowCount === 1){
        await suspend_user(req.body.username, "SUSPENDED");
        return res.status(200).send(`USER SUSPENDED!`)
    }
    return res.status(404).send(`User Not Found`);
}

export async function reactivateUser(req: Request, res: Response) {
    let findUser = await get_user(req.body.username)
    if (findUser?.rowCount === 1) {
        await suspend_user(req.body.username, "ACTIVE");
        return res.status(200).send(`USER RE-ACTIVATED`);
    }
    return res.status(404).send(`USER NOT FOUND!`)
}

export async function removeUser(req: Request, res: Response) {
    let findUser = await get_user(req.body.username)
    if (findUser?.rowCount === 1){
        await delete_user(req.body.username);
        return res.status(200).send(`USER DELETED`)
    }
    return res.status(404).send(`USER NOT FOUND!`);
}

export async function getAllUsers(req: Request, res: Response) {
    let user = await get_all_users();
    if (user.rowCount === 0) {
        return res.status(404).send(`Empty`)
    }
    return res.status(200).send(user.rows)
}

export async function updateUserRole(req: Request, res: Response) {
    let findUser = await get_user(req.body.username);
    if (findUser?.rowCount === 1) {
        await update_user_role(req.body.username, req.body.role);
        return res.status(200).send(`USER UPDATED`);
    }
    return res.status(404).send(`USER NOT FOUND IN DATABASE`);
}

export async function getAllAuthorizedAdmins(req:Request, res:Response) {
    let users = await get_admins();
    if(users){
        return res.status(200).send(users.rows);
    }
    return res.status(404).send(`Not Found!`)
}

export async function updateUserPassword(req: Request, res: Response) {
    let findUser = await get_user(req.body.username);
    if (findUser.rowCount === 1) {
        const PSW = await bcrypt.hash(req.body.password, 12)
        console.log(PSW)

        await update_user_password(req.body.username, PSW);
        return res.status(200).send(`USER UPDATED`);
    }
    return res.status(404).send(`USER NOT FOUND IN DATABASE`);
}

export async function updateUserPasscode(req: Request, res: Response) {
    let findUser = await get_user(req.body.username);
    if (findUser.rowCount === 1) {
        await update_user_password(req.body.username, req.body.passcode);
        return res.status(200).send(`USER UPDATED`);
    }
    return res.status(404).send(`USER NOT FOUND IN DATABASE`);
}