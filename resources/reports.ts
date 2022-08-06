import { Request, Response } from "express";
import { get_waiters_that_closed_tables } from "../models/reports";


export async function report(req: Request, res: Response) {
    await get_waiters_that_closed_tables();
    return res.status(200).send(`Done`);
}