import express from 'express'
import { report, getItemReports } from '../resources/reports';


export const router = express.Router();

router.get('/waiter-reports', report)
router.get('/sold-items', getItemReports)

module.exports = router;