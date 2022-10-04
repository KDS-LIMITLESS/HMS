import express from 'express'
import { appendFile } from 'fs';
import { sendItemsToDepartments, getDepartments } from '../resources/item'

const router = express.Router();

router.post('/send-items', sendItemsToDepartments)
router.get('/departments', getDepartments)

module.exports = router;