import express from 'express'
import { newUser, login, checkPasscode, suspendUser, removeUser } from "../resources/user";
import { authorizeSuperAdminNext, authorizeAuditor, checkIsUserSuspended } from "../middlewares/user";


export const router = express.Router()


router.post('/new-user', newUser)
router.post('/add-user', authorizeSuperAdminNext, newUser)
router.post('/login', checkIsUserSuspended, login)
router.post('/check-passcode', checkPasscode)
router.post('/suspend-user', authorizeAuditor, suspendUser)
router.post('/delete-user', authorizeAuditor, removeUser)

module.exports = router;