import { Request, Response, NextFunction } from "express";
import { create_new_table, get_table, get_all_waiter_tables, 
        get_one_waiter_table, close_table } from "../models/table";
// import { close_order_table, get_closed_tables } from "../models/table";


export async function createTable(req:Request, res: Response, next: NextFunction) {
    try {
        let table = await get_table(req.body.table)

        // if (table.rowCount === 1 ) return res.status(400).send(`Table already exists`)

        await create_new_table(req.body.table_name, req.body.activeUser)
        console.log(`Created table ${req.body.table_name}` )
        
        next();
    }catch(err: any){
        console.log(err.message + ` in createTable resource`)
        return res.status(400).send(`Table already exists`)
    }
}

export async function getWaiterTables(req: Request, res: Response) {
    try {
        let result = await get_all_waiter_tables(req.body.activeUser)
        if (result) return res.status(200).send(result)

        return res.status(400).send(`None`)
        
    }catch (err: any){
        console.log(err.message)
        return res.status(400).send(err.message)
    }
}

export async function closeTable(req:Request, res:Response) {

    let getTable = await get_one_waiter_table(req.body.table_name, req.body.activeUser);
    // const TABLE_CLOSED = await get_closed_tables(req.body.table_name);
    try {
        if (getTable.rows[0]['status'] === 'OPEN'){
            await close_table(req.body.activeUser, "CLOSED", req.body.table_name, req.body.payment_method, req.body.total);
            return res.status(200).send("Table Closed Successfully")
        }
        return res.status(400).send(`Table already closed or does not exist `)
    }catch(err: any){
        console.log(err.message);
        return res.status(400).send(err.message)
    }   
}