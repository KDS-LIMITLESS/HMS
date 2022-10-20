import express from 'express'
import {  getAllItemsSent, getTransactionDates,
     distributeItems, getAllItemsSentToDepartment, deleteItem } from '../resources/item'

import { authorizeAuditor } from '../../middlewares/user';

const router = express.Router();

router.get('/sent-items', getAllItemsSent)

router.post('/sent-items/department', getAllItemsSentToDepartment)
router.post('/send-items', distributeItems)
router.post('/transactions', getTransactionDates)

router.delete('/delete-item', authorizeAuditor, deleteItem)
module.exports = router;