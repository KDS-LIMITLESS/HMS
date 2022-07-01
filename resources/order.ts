import { Response, Request } from "express";
import { new_order } from "../models/order";

export async function placeOrder(req: Request, res: Response){
    let time = new Date();
    try {
        await new_order(req.body.username, req.body.item, req.body.price, 
            req.body.quantity, req.body.total_amount, time.toLocaleTimeString()
        )
        return res.status(200).send(` OK `)
    }catch(err: any) {
        console.error(err.message)
        return res.status(400).send("Login to continue")
    }
}

// notification
// printing dockets
// logout 
// splitting orders into a transaction
// check which user from passcode
