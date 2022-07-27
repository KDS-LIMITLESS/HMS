import express from 'express'
import { getcreditStatus, setStaffCreditLimit, UserCreditStatus } from "../resources/credit";

export const router = express.Router();

router.get('/credit-status', getcreditStatus);

router.post('/grant-credit', setStaffCreditLimit);
router.post('/user-credit', UserCreditStatus )



module.exports = router;