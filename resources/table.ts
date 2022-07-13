import { Request, Response, NextFunction } from "express";
import { create_new_table, get_table, get_all_waiter_tables, get_one_waiter_table } from "../models/table";
import { close_order_table, get_closed_tables } from "../models/table";


export async function createTable(req:Request, res: Response, next: NextFunction) {
    try {
        let table = await get_table(req.body.table)

        if (table !== null ) return res.status(400).send(`Table in use`)

        await create_new_table(req.body.table_name, req.body.activeUser)
        console.log(`Created table ${req.body.table_name}` )
        
        next();
    }catch(err: any){
        console.log(` table in use`)
        return res.status(400).send(`table already exists`)
    }
}

export async function getTable(req: Request, res: Response) {
    try {
        let result = await get_all_waiter_tables(req.body.activeUser)
        if (result) return res.status(200).send(result)

        return res.status(400).send(`None`)
        
    }catch (err: any){
        console.log(err.message)
    }
}

export async function closeTable(req:Request, res:Response) {
    let time = new Date()

    let getTable = await get_one_waiter_table(req.body.table_name, req.body.activeUser);
    const TABLE_CLOSED = await get_closed_tables(req.body.table_name);

    try {
        if (getTable.rowCount === 0 || TABLE_CLOSED.rowCount === 1){
            return res.status(400).send(`table not found or table already closed`)
        } 
        // check if this table has orders in the order table before closing!
    
        console.log(`here!!`)
        const CLOSE_TABLE = await close_order_table(req.body.activeUser, req.body.table_name, 
                req.body.payment_method, req.body.total, time.toLocaleTimeString());
        
        console.log( CLOSE_TABLE.rowCount)
        return res.status(200).json({table_status: "CLOSED"});
    }catch(err: any) {
        return res.status(400).send(err.message)
    }

   
}