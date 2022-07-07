import { Request, Response, NextFunction } from "express";
import { create_new_table, get_table, get_waiter_tables } from "../models/table";



export async function createTable(req:Request, res: Response, next: NextFunction) {
    try {
        let table = await get_table(req.body.table)

        if (table !== null ) return res.status(400).send(`Table in use`)

        await create_new_table(req.body.table_name, req.body.activeUser)
        console.log(`Created table ${req.body.table_name}` )
        
        next();
    }catch(err: any){
        console.log(` table in use`)
        return res.status(400).send(err.message)
    }
}

export async function getTable(req: Request, res: Response) {
    try {
        let result = await get_waiter_tables(req.body.activeUser)
        if (result) return res.status(200).send(result)

        return res.status(400).send(`None`)
        
    }catch (err: any){
        console.log(err.message)
    }
}