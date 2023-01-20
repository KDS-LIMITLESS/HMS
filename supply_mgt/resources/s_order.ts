import { Request, Response } from 'express'
import { find_supplier } from '../models/suppliers'
import { place_supply_order, receive_supply_order, cancel_supply_order, get_order } from '../models/s_order'


export async function placeSupplyOrder(req:Request, res:Response) {
    const body = req.body
    let findSupplier = await find_supplier(body['supplierName'])
    if (findSupplier) {
        let order = await place_supply_order(body['item'], body['quantity'], body['size'], body['unitPrice'],
            body['measure'], body['supplierName'])
        return res.status(200).json({message: "Supply order sent", data: order})
    }
    return res.status(400).json({message: "Supplier not found in database"})    
}

export async function receiveSupplyOrder(req:Request, res:Response) {
    let body = req.body
    let getOrder = await get_order(body['supplier'], body['item'], "PENDING")
    if (getOrder) {
        let update = await receive_supply_order(body['supplier'], body['item'])
        return res.status(200).json({message: "Supply updated", data: update})
    }
    return res.status(400).json({message: "Supply details not found in database"})    
}