import express from 'express'
import { newUser, login, checkPasscode } from "../resources/user";
import { authorizeSuperAdminNext } from "../middlewares/user";


export const router = express.Router()


router.post('/new-user', newUser)
router.post('/add-user', authorizeSuperAdminNext, newUser)
router.post('/login', login)
router.post('/check-passcode', checkPasscode)

module.exports = router;