import express from 'express'
import { newSupplier, getSupplierDetails } from '../resources/suppliers'

export const router = express.Router()

router.get('/supplier-details', getSupplierDetails)
router.post('/new-supplier', newSupplier)

module.exports = router