import express from 'express'
import { notifications } from '../resources/notification'

const router = express.Router()

router.get('/notification', notifications)

module.exports = router
