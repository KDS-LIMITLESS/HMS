import express from 'express'
import { distributeItems,  deleteItem } from '../resources/item'

import { authorizeAuditor } from '../../middlewares/user';

const router = express.Router();

router.post('/send-items', distributeItems)
router.delete('/delete-item', authorizeAuditor, deleteItem)

module.exports = router;