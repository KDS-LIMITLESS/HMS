import express from 'express'
import { getcreditStatus, grantStaffCredit, UserCreditStatus } from "../resources/credit";

export const router = express.Router();

router.get('/credit-status', getcreditStatus);

router.post('/grant-credit', grantStaffCredit);
router.post('/user-credit', UserCreditStatus )



module.exports = router;