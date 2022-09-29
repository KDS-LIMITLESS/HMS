import express from 'express'
import { updateOrderStatus, placeOrder } from '../resources/order'

const router = express.Router()


router.post('/place-order', placeOrder)



module.exports = router;