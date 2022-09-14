import { Request, Response, NextFunction } from "express";
import { create_new_table, get_table, get_all_waiter_tables, 
    get_one_waiter_table, close_table, get_all_tables, get_table_discount,
    get_table_date_and_time } from "../models/table";
import { get_item } from "../models/item";        
import { exit } from "process";
// import { close_order_table, get_closed_tables } from "../models/table";


export async function createTable(req:Request, res: Response, next: NextFunction) {
   
    const ORDER: [] = req.body.order;
    let table = await get_table(req.body.table_name)
    let order;

    if (table.rowCount === 1) {
        console.log(`table exists`)
        return res.status(400).end(`Table already exists`)
    } 
    if (table.rowCount === 0) {
        for (order of ORDER){
            let item = await get_item(order['product'], order['department']);
            
            if (item === null)  {     
                console.log(item)
                console.log(`${order['product']} Not found`)
                res.status(404).end(`Not Found!`); 
                exit()
                //stop crashing the server here!!
            };
            continue
        }
    }
    await create_new_table(req.body.table_name, req.body.activeUser)
    console.log(`Created table ${req.body.table_name}` )     
    next();
}

export async function getAllTables(req:Request, res: Response) {
    try{
        const TABLES = await get_all_tables();
        if (TABLES) return res.status(200).send(TABLES?.rows)
        return res.status(404).send(`Table not found!`)
        
    }catch(err: any){
        console.log(err.message)
        res.status(400).send(err.message)
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
            // console.log(req.body)
            await close_table(req.body.activeUser, "CLOSED", req.body.table_name, req.body.cash,
                req.body.pos, req.body.credit, req.body.transfer, req.body.total, req.body.discount,
                req.body.complimentary_drink, req.body.complimentary_qty);
            // console.log(req.body)
            return res.status(200).send("Table Closed Successfully")
        }
        return res.status(400).send(`Table already closed or does not exist `)
    }catch(err: any){
        console.log(err.message);
        return res.status(400).send(err.message)
    }   
}

export async function getTableDateAndTime(req: Request, res: Response){
    try {
        let table = await get_table(req.body.table_name)
        console.log(table.rowCount)
        if (table.rowCount === 1 && table.rows[0]['status'] === "CLOSED") {
           let dateTime =  await get_table_date_and_time(req.body.table_name)
            return res.json({
                date: dateTime.rows[0]['date'],
                time: dateTime.rows[0]['time']
            })
        }
        return res.status(400).send('Table not closed')
    } catch (err:any) {
        console.log(err.message)
        return res.status(400).send(`Null`)
    }
}

export async function getTableDiscount(req:Request, res: Response) {
    
    let result = await get_table_discount(req.body.table_name)
    try{
        if (result.rowCount === 1) return res.status(200).json({
            
            waiter: result.rows[0]['waiter'],
            discount: result.rows[0]['discount'],
            total: result.rows[0]['total'],
            complimentary_drink: result.rows[0]['complimentary_drink'],
            complimentary_qty: result.rows[0]['complimentary_qty']
        })
        return res.status(404).send('TABLE NOT FOUND!')
        
    }catch (e:any){
        console.log(e.message);
        return res.status(400).send(e.message)
    } 
}