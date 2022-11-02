import express from 'express'
import { report, getItemReports, generateOverallReport, clearDbDetails, 
    filterOverallReport, filterIndividualReport } from '../resources/reports';
import { uploadReportFile, retrievePDF } from '../middlewares/imageloader';
import { authorizeSuperAdminNext } from '../middlewares/user';


export const router = express.Router();

router.get('/waiter-reports', report)
router.post('/individual-report', getItemReports);
router.post('/filter-individual-report', filterIndividualReport)
router.get('/overall-reports', generateOverallReport)

router.post('/filter-reports', filterOverallReport)
router.post('/upload-report', uploadReportFile)
router.post('/retrieve-pdf', retrievePDF)

// router.delete('/clear-db', authorizeSuperAdminNext, clearDbDetails)


module.exports = router;
