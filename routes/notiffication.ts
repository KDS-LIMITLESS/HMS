import express from 'express'
import { notifications, waiters } from '../resources/notification'

const router = express.Router()

router.get('/waiters', waiters)
router.post('/notification', notifications)

module.exports = router
