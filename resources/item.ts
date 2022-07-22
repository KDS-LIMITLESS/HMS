import { get_all_items, add_item, get_item, 
        get_all_items_with_category, get_drinks_in_department, 
        delete_item, update_item
} from "../models/item";
import { Request, Response } from "express";

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
    try{
        if (await get_item(reqBody['product'], reqBody['department']) !== null) return res.status(400)
        .send(`${reqBody['product']} already exists`)

        await add_item(reqBody['product'], reqBody['price'], reqBody['category'], reqBody['image'], reqBody['department'])
        return res.status(200).send('OK');  
        
    } catch (err: any) {
        console.log(err.message);
        return res.status(400).send(err.message)
    }
}

export async function getItemsInCategory(req:Request, res:Response) {
    const reqBody = req.body;
    const result = await get_all_items_with_category(reqBody['category'])
    return res.status(200).send(result.rows)
}


export async function getAllDrinksDepartment(req:Request, res:Response) {
    try{
        const result = await get_drinks_in_department(req.body.department)
        return res.status(200).send(result.rows)
    
    }catch(err:any){
        console.error(err)
        return res.status(400).send("An Error Occured ")
    }
}

export async function deleteItem(req: Request,res: Response){
    try {
        const ITEM = await get_item(req.body.product, req.body.department)
        console.log(ITEM)
        if (ITEM.rowCount === 1) {
            await delete_item(req.body.product, req.body.department)
            return res.status(200).send("OK")
        }
       
        return res.status(400).send(`Error. Item does not exist.`)
    } catch(err: any) {
        return res.status(400).send(err.message)
    }
}

export async function updateItem(req:Request, res: Response) {
    try{
        const ITEM = await get_item(req.body.product, req.body.department)
        if (ITEM.rowCount === 1) {
            await update_item(req.body.product, req.body.price);
            return res.status(200).send(`ITEM UPDATED`)
        }
        return res.status(404).send(`Item not found in department!`);
    } catch (err: any) {
        return res.status(400).send(err.message)
    }   
}