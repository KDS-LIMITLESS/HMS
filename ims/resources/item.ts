import { Request, Response } from 'express';


export async function sendItems(req:Request, res:Response) {
    console.log(req.body)
}