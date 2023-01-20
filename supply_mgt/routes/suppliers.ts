import express from 'express'
import { newSupplier } from '../resources/suppliers'

export const router = express.Router()

router.post('/new-supplier', newSupplier)

module.exports = router