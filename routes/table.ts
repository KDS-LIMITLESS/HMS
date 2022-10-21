import { Router } from 'express';
import { getWaiterTables, getAllTables, closeTable, getTableDiscount, getTableDateAndTime,
    clearTables, filterTables } from '../resources/table';
import { authorizeUser, authorizeAuditor, authorizeDiscount, authorizeCredit } from '../middlewares/user';

export const router = Router();

router.post('/tables', getWaiterTables); // rename to my-tables
router.post('/close-table', authorizeDiscount, authorizeCredit, closeTable);
// admin table to see all tables 
router.post('/all-tables', authorizeAuditor, getAllTables);
router.post('/table-discount', getTableDiscount)
router.post('/table-date', getTableDateAndTime)
router.post('/filter-tables', filterTables)

router.put('/clear-tables', authorizeAuditor, clearTables)


module.exports = router;