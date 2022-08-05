import express from 'express'
import { getcreditStatus, setStaffCreditLimit, UserCreditStatus } from "../resources/credit";
import { authorizeSuperAdminNext } from '../middlewares/user';

export const router = express.Router();

router.get('/credit-status', getcreditStatus);

router.post('/grant-credit', authorizeSuperAdminNext, setStaffCreditLimit);
router.post('/user-credit', UserCreditStatus )



module.exports = router;