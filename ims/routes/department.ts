import express from 'express';
import { createDepartment, getDepartments } from '../resources/department';


const router = express.Router()

router.get('/departments', getDepartments)

router.post('/create-dept', createDepartment)


module.exports = router;