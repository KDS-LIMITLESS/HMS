import { Request, Response } from 'express'
import { find_supplier } from '../models/suppliers'
import { place_supply_order, receive_supply_order, cancel_supply_order, 
    get_all_supplier_placed_order, get_all_supplier_received_orders, get_order,
    get_total, get_date, get_all_cancelled_orders,
    get_all_damaged_orders, get_all_returned_orders,
    get_all_placed_orders, get_all_received_orders, get_order_counts} from '../models/s_order'


export async function placeSupplyOrder(req:Request, res:Response) {
    const body = req.body
    let findSupplier = await find_supplier(body['supplierName'])
    console.log(findSupplier.rows)
    if (findSupplier.rowCount >= 1) {
        let order = await place_supply_order(body['item'], body['quantity'], body['size'], body['unitPrice'],
            body['measure'], body['supplierName'], body['total_price'], "PENDING")
        return res.status(200).json({message: "Supply order sent", data: order.rows})
    }
    return res.status(400).json({message: "Supplier not found in database"})    
}

export async function damagedSupplyOrder(req:Request, res:Response) {
    const body = req.body
    let findSupplier = await find_supplier(body['supplierName'])
    console.log(findSupplier.rows)
    if (findSupplier.rowCount >= 1) {
        let order = await place_supply_order(body['item'], body['quantity'], body['size'], body['unitPrice'],
            body['measure'], body['supplierName'], body['total_price'], "DAMAGED")
        return res.status(200).json({message: "Supply order sent", data: order.rows})
    }
    return res.status(400).json({message: "Supplier not found in database"})    
}

export async function returnSupplyOrder(req:Request, res:Response) {
    const body = req.body
    let findSupplier = await find_supplier(body['supplierName'])
    console.log(findSupplier.rows)
    if (findSupplier.rowCount >= 1) {
        let order = await place_supply_order(body['item'], body['quantity'], body['size'], body['unitPrice'],
            body['measure'], body['supplierName'], body['total_price'], "RETURNED")
        return res.status(200).json({message: "Supply order sent", data: order.rows})
    }
    return res.status(400).json({message: "Supplier not found in database"})    
}

export async function receiveSupplyOrder(req:Request, res:Response) {
    let body = req.body
    let getOrder = await get_order(body['supplier'], body['item'], "PENDING")
    if (getOrder.rowCount >= 1) {
        let update = await receive_supply_order(body['supplier'], body['item'])
        return res.status(200).json({message: "Supply updated", data: update.rows})
    }
    return res.status(400).json({message: "Supply details not found in database"})    
}

export async function cancelSupplyOrder(req:Request, res:Response) {
    let body = req.body
    let getOrder = await get_order(body['supplier'], body['item'], "PENDING")
    if (getOrder.rowCount >= 1) {
        let update = await cancel_supply_order(body['supplier'], body['item'])
        return res.status(200).json({message: "Supply updated", data: update.rows})
    }
    return res.status(400).json({message: "Supply details not found in database"})    
}

export async function getAllPlacedOrders(req:Request, res:Response) {
    const orders = await get_all_supplier_placed_order(req.body.supplier)
    if(orders.rowCount >= 1) return res.status(200).json({data: orders.rows})
    return res.status(400).json({message: "Not found"})
}

export async function getAllReceivedOrders(req:Request, res:Response) {
    const orders = await get_all_supplier_received_orders(req.body.supplier)
    if(orders.rowCount >= 1) return res.status(200).json({data: orders.rows})
    return res.status(400).json({message: "Not found"})
}

export async function getAllCancelledOrders(req:Request, res:Response) {
    const orders = await get_all_cancelled_orders(req.body.supplier)
    if(orders.rowCount >= 1) return res.status(200).json({data: orders.rows})
    return res.status(400).json({message: "Not found"})
}

export async function getAllDamagedOrders(req:Request, res:Response) {
    const orders = await get_all_damaged_orders(req.body.supplier)
    if(orders.rowCount >= 1) return res.status(200).json({data: orders.rows})
    return res.status(400).json({message: "Not found"})
}

export async function getAllReturnedOrders(req:Request, res:Response) {
    const orders = await get_all_returned_orders(req.body.supplier)
    if(orders.rowCount >= 1) return res.status(200).json({data: orders.rows})
    return res.status(400).json({message: "Not found"})
}

export async function getTotalPlacedOrders(req:Request, res:Response){
    const total = await get_total(req.body.supplier)
    return res.status(200).json({data: total.rows})
}

export async function getAllPlacedOrder(req:Request, res:Response) {
    let orders = await get_all_placed_orders()
    return res.status(200).json({data: orders.rows})
}

export async function getAllReceivedOrder(req:Request, res:Response) {
    let orders = await get_all_received_orders()
    return res.status(200).json({data: orders.rows})
}

export async function getOrderCounts(req:Request, res:Response) {
    let orders = await get_order_counts()
    return res.status(200).json({data: orders.rows})
}

export async function filterDate(req:Request, res:Response) {
    let date = await get_date(req.body.from, req.body.to)
    console.log(req.body)
    if (date) return res.status(200).json({filters: date.rows, count: date.rowCount})
    return res.status(400).send("Transactions within the specified date does not exist")
}