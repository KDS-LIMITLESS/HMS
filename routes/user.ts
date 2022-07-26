import express from 'express'
import { newUser, login, checkPasscode, suspendUser, removeUser, 
    reactivateUser, getAllUsers, updateUserRole, getAllAuthorizedAdmins } from "../resources/user";
import { authorizeSuperAdminNext, authorizeAuditor, checkIsUserSuspended } from "../middlewares/user";


export const router = express.Router()

router.get('/users', getAllUsers)
router.get('/authorized-admins', getAllAuthorizedAdmins)

router.post('/new-user', newUser)
router.post('/add-user', authorizeSuperAdminNext, newUser)
router.post('/login', checkIsUserSuspended, login)
router.post('/check-passcode', checkPasscode)

router.delete('/delete-user', authorizeAuditor, removeUser)

router.put('/suspend-user', authorizeAuditor, suspendUser)
router.put('/reactivate', authorizeAuditor, reactivateUser)
router.put('/update-role', authorizeAuditor, updateUserRole)

module.exports = router;