import express from 'express'
import { newUser, login } from "../resources/user";
import { authorizeSuperAdmin } from "../middlewares/user";


export const router = express.Router()


router.post('/new-user', authorizeSuperAdmin, newUser)
router.post('/login', login)

module.exports = router;