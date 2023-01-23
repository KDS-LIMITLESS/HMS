import { Request, Response } from 'express'
import { new_supplier, find_supplier, get_all_supplier } from '../models/suppliers'

export async function newSupplier(req:Request, res:Response) {
    const body = req.body
    const isSupplier = await find_supplier(req.body.supplier_name)
    console.log(isSupplier.rows)
    if (isSupplier.rowCount > 0) return res.status(400).json({message: `Supplier already exists.`})

    let create_supplier = await new_supplier(body['supplier_name'], body['email'], body['phone'],
        body['gender'], body['address'])
    return res.status(200).json({message: "New Supplier added", data: create_supplier})
}

export async function getSupplierDetails(req:Request, res:Response) {
    const getSupplier = await find_supplier(req.body.supplier_name)
    console.log(getSupplier.rows)
    if (getSupplier.rowCount >= 1) return res.status(200).json({data: getSupplier})
    return res.status(400).json({message: "supplier does not exist"})
}

export async function getAllSuppliers(req:Request, res:Response) {
    const getSupplier = await get_all_supplier()
    if (getSupplier.rowCount >= 1) return res.status(200).json({data: getSupplier.rows})
    return res.status(400).json({message: "No suppliers found!"})
}