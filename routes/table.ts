import { Router } from 'express';
import { getTable } from '../resources/table';

export const router = Router();

router.post('/tables', getTable);

module.exports = router;