import {  getAllItemsSent, getTransactionDates,
    getAllItemsSentToDepartment } from '../resources/transaction'
import { Router } from'express'

const router = Router();

router.get('/sent-items', getAllItemsSent)
router.post('/sent-items/department', getAllItemsSentToDepartment)
router.post('/transactions', getTransactionDates)


module.exports = router;