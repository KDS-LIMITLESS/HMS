import express from 'express'
import { report } from '../resources/reports';


export const router = express.Router();

router.get('/reports', report)

module.exports = router;