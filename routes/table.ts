import { Router } from 'express';
import { getWaiterTables, getAllTables, closeTable, getTableDiscount } from '../resources/table';
import { authorizeUser, authorizeAuditor } from '../middlewares/user';

export const router = Router();

router.post('/tables', getWaiterTables); // rename to my-tables
router.post('/close-table', authorizeUser, closeTable);
// admin table to see all tables 
router.post('/all-tables', authorizeAuditor, getAllTables);
router.post('/table', getTableDiscount)


module.exports = router;