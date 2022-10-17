import express from 'express'
import { appendFile } from 'fs';
import {  getAllItemsSent, getTransactionDates,
     distributeItems, getAllItemsSentToDepartment } from '../resources/item'

const router = express.Router();

router.get('/sent-items', getAllItemsSent)
router.get('/sent-items/department', getAllItemsSentToDepartment)

router.post('/send-items', distributeItems)
router.post('/transactions', getTransactionDates)

module.exports = router;