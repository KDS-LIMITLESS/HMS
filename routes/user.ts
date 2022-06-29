import { newUser, login } from "../resources/user";
import express from 'express'

export const router = express.Router()

router.post('/new-user', newUser)
router.post('/login', login)

module.exports = router;