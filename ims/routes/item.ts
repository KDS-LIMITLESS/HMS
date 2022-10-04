import express from 'express'
import { appendFile } from 'fs';
import { sendItemsToDepartments, getDepartments, getAllItemsSent } from '../resources/item'

const router = express.Router();

router.get('/departments', getDepartments)
router.get('/sent-items', getAllItemsSent)
router.post('/send-items', sendItemsToDepartments)

module.exports = router;