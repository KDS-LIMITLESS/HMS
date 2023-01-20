import express from 'express'
import { placeSupplyOrder, receiveSupplyOrder } from '../resources/s_order'

const router = express.Router()

router.post("/place-order", placeSupplyOrder)
router.put("/receive-supply-order", receiveSupplyOrder)

module.exports = router