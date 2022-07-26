import express from 'express'
import { getcreditStatus, grantStaffCredit } from "../resources/credit";

export const router = express.Router();

router.get('/credit-status', getcreditStatus);
router.post('/grant-credit', grantStaffCredit)

module.exports = router;