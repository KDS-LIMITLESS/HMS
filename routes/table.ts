import { Router } from 'express';
import { getWaiterTables } from '../resources/table';
import { authorizeUser } from '../middlewares/user';
import { closeTable } from '../resources/table';

export const router = Router();

router.post('/tables', getWaiterTables);
router.post('/close-table', authorizeUser, closeTable)


module.exports = router;