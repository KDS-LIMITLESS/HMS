import { Router } from 'express';
import { getWaiterTables, getAllTables, closeTable, getTableDiscount } from '../resources/table';
import { authorizeUser, authorizeAuditor, authorizeDiscount, authorizeCredit } from '../middlewares/user';

export const router = Router();

router.post('/tables', getWaiterTables); // rename to my-tables
router.post('/close-table', authorizeDiscount, authorizeCredit, closeTable);
// admin table to see all tables 
router.post('/all-tables', authorizeAuditor, getAllTables);
router.post('/table', getTableDiscount)


module.exports = router;