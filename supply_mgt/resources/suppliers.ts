import { Request, Response } from 'express'
import { new_supplier, find_supplier } from '../models/suppliers'

export async function newSupplier(req:Request, res:Response) {
    const body = req.body
    const isSupplier = await find_supplier(req.body.supplier_name)
    if (isSupplier) return res.status(400).json({message: `Supplier already exists.`})

    let create_supplier = await new_supplier(body['supplier_name'], body['email'], body['phone'],
        body['gender'], body['address'])
    return res.status(200).json({message: "New Supplier added", data: create_supplier})
}