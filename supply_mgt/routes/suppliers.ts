import express from 'express'
import { newSupplier, getSupplierDetails, getAllSuppliers } from '../resources/suppliers'

export const router = express.Router()

router.get('/suppliers', getAllSuppliers)
router.post('/supplier-details', getSupplierDetails)
router.post('/new-supplier', newSupplier)

module.exports = router