import express from 'express'
import { placeSupplyOrder, receiveSupplyOrder, getAllPlacedOrders,
    getAllReceivedOrders, getTotalPlacedOrders, cancelSupplyOrder,
filterDate, getAllCancelledOrders, damagedSupplyOrder,
returnSupplyOrder, getAllDamagedOrders, getAllReturnedOrders,
getAllPlacedOrder, getAllReceivedOrder, getOrderCounts} from '../resources/s_order'

const router = express.Router()

router.get('/get-all-placed-orders', getAllPlacedOrder)
router.get('/get-all-received-orders', getAllReceivedOrder)
router.get('/count', getOrderCounts)
router.post("/place-order", placeSupplyOrder)
router.post('/placed-orders', getAllPlacedOrders)
router.post('/received-orders', getAllReceivedOrders)
router.post('/cancelled-orders', getAllCancelledOrders)
router.post('/get-total', getTotalPlacedOrders)
router.post("/filter-supply-date", filterDate)
router.post("/get-damaged-orders", getAllDamagedOrders)
router.post("/get-returned-order", getAllReturnedOrders)
router.post('/set-damaged-order', damagedSupplyOrder)
router.post('/return-supply-order', returnSupplyOrder)
router.put("/receive-supply-order", receiveSupplyOrder)
router.put("/cancel-supply-order", cancelSupplyOrder)

module.exports = router