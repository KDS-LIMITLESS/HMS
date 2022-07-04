import { get_all_items, add_item, get_item, 
        get_all_items_with_category 
} from "../models/item";
import { Request, Response } from "express";
import fs from 'fs';


export async function getItem(req: Request, res: Response){
    try{
        
        const result = await get_all_items()
        return res.status(200).send(result.rows)
    
    }catch(err:any){
        console.error(err)
        return res.status(400).send("An Error Occured ")
    }
}

export async function addNewItem(req:Request, res: Response) {
    const reqBody = req.body;
    
    if (await get_item(reqBody['product']) !== null) return res.status(400)
        .send(`${reqBody['product']} already exists`)

    fs.access(`uploads/${req.body.image}`, (err) => {
        if (!err){
            add_item(reqBody['product'], reqBody['price'], reqBody['category'], reqBody['image'])
            .catch((err) => {
                return res.status(400).send(err.message)
            })
            .then(() => {
                return res.status(200).send('OK')
            });
        } else {
            console.log(err.message)
            return res.status(400).send(err)
        }
    })
}

export async function getItemsInCategory(req:Request, res:Response) {
    const reqBody = req.body;
    const result = await get_all_items_with_category(reqBody['category'])
    return res.status(200).send(result.rows)
}