import express from 'express'
import { placeSupplyOrder, receiveSupplyOrder, getAllPlacedOrders,
    getAllReceivedOrders, getTotalPlacedOrders } from '../resources/s_order'

const router = express.Router()

router.post("/place-order", placeSupplyOrder)
router.post('/placed-orders', getAllPlacedOrders)
router.post('/received-orders', getAllReceivedOrders)
router.post('/get-total', getTotalPlacedOrders)
router.put("/receive-supply-order", receiveSupplyOrder)

module.exports = router