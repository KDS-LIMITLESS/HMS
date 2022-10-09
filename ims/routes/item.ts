import express from 'express'
import { appendFile } from 'fs';
import {  getAllItemsSent, getTransactionDates,
     distributeItems } from '../resources/item'

const router = express.Router();

router.get('/sent-items', getAllItemsSent)

router.post('/send-items', distributeItems)
router.post('/transactions', getTransactionDates)

module.exports = router;