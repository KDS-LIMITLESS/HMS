import express from 'express'
import { report, getItemReports } from '../resources/reports';


export const router = express.Router();

router.get('/reports', report)
router.get('/items-report', getItemReports)

module.exports = router;