import { Request, Response, NextFunction } from "express";
import { create_new_table } from "../models/table";


export async function createTable(req:Request, res: Response, next: NextFunction) {
    try {
        let result = await create_new_table(req.body.table_name, req.body.activeUser)
        console.log(`Created table ${result.rows[0]['table_name']}` )
        
        next();
    }catch(err: any){
        console.log(err.message)
        return err.message
    }
}