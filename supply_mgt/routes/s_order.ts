import express from 'express'
import { placeSupplyOrder, receiveSupplyOrder, getAllPlacedOrders,
    getAllReceivedOrders, getTotalPlacedOrders, cancelSupplyOrder,
filterDate } from '../resources/s_order'

const router = express.Router()

router.post("/place-order", placeSupplyOrder)
router.post('/placed-orders', getAllPlacedOrders)
router.post('/received-orders', getAllReceivedOrders)
router.post('/get-total', getTotalPlacedOrders)
router.post("/filter-supply-date", filterDate)
router.put("/receive-supply-order", receiveSupplyOrder)
router.put("/cancel-supply-order", cancelSupplyOrder)

module.exports = router