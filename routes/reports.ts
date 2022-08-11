import express from 'express'
import { report, getItemReports } from '../resources/reports';


export const router = express.Router();

router.get('/waiter-reports', report)
router.post('/sold-items', getItemReports)

module.exports = router;

// i am me this cool igbo guy abu m onye igbo and as you can see a na m asu igbo 
// buh for now ka m were ya n oyibo... 
// so i dey huzzle my daily 2k usual 0% fraud etc..