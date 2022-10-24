import {  getAllItemsSent, getTransactionDates,
    getAllItemsSentToDepartment, deleteTransaction } from '../resources/transaction'
import { Router } from'express'

const router = Router();

router.get('/sent-items', getAllItemsSent)
router.post('/sent-items/department', getAllItemsSentToDepartment)
router.post('/transactions', getTransactionDates)

router.delete('/delete-transactions', deleteTransaction) 


module.exports = router;