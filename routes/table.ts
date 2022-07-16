import { Router } from 'express';
import { getWaiterTables, getAllTables, closeTable, getTableDiscount } from '../resources/table';
import { authorizeUser, authorizeAuditor } from '../middlewares/user';

export const router = Router();

router.post('/tables', getWaiterTables);
router.post('/close-table', authorizeUser, closeTable);
router.post('/all-tables', authorizeAuditor, getAllTables);
router.post('/table', getTableDiscount)


module.exports = router;