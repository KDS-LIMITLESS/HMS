import { Router } from 'express';
import { getWaiterTables, getAllTables, closeTable } from '../resources/table';
import { authorizeUser, authorizeAuditor } from '../middlewares/user';

export const router = Router();

router.post('/tables', getWaiterTables);
router.post('/close-table', authorizeUser, closeTable);
router.post('/all-tables', authorizeAuditor, getAllTables)


module.exports = router;