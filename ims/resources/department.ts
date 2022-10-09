import { Request, Response } from 'express'
import { create_dept, get_departments } from '../models/department'


export async function createDepartment(req:Request, res:Response) {
    const dept = await create_dept(req.body.department)
    return res.status(200).send("OK")
}


export async function getDepartments(req:Request, res:Response) {
    let dept = await get_departments()
    return res.status(200).send(dept.rows)
}
