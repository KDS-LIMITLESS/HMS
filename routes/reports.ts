import express from 'express'
import { report, getItemReports, generateOverallReport, clearDbDetails } from '../resources/reports';
import { uploadReportFile, retrievePDF } from '../middlewares/imageloader';
import { authorizeSuperAdminNext } from '../middlewares/user';


export const router = express.Router();

router.get('/waiter-reports', report)
router.post('/individual-report', getItemReports);
router.get('/overall-reports', generateOverallReport)
router.post('/upload-report', uploadReportFile)
router.post('/retrieve-pdf', retrievePDF)

// router.delete('/clear-db', authorizeSuperAdminNext, clearDbDetails)


module.exports = router;

// i am me this cool igbo guy abu m onye igbo and as you can see a na m asu igbo 
// buh for now ka m were ya n oyibo... 
// so i dey huzzle my daily 2k usual 0% fraud etc..