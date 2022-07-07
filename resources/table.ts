import { Request, Response, NextFunction } from "express";
import { create_new_table } from "../models/table";


export async function createTable(req:Request, res: Response, next: NextFunction) {
    try {
        console.log(JSON.stringify(req.body) + ' From createTable function...')
        let result = await create_new_table(JSON.stringify(req.body.table_name), req.body.activeUser)
        console.log(`Created table ${result.rows[0]['table_name']}` )
        
        next();
    }catch(err: any){
        console.log(err.message)
        return res.status(400).send(err.message)
    }
}