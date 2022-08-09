import express from 'express'
import { notifications, waiters, updateNotificationStatus, notificationCount } from '../resources/notification'

const router = express.Router()

router.get('/waiters', waiters)
router.get('/notification-count', notificationCount)

router.post('/notification', notifications)
router.put('/update-notification', updateNotificationStatus)

module.exports = router
