import express from 'express';
import { getItem, addNewItem, getItemsInCategory, getAllDrinksDepartment, 
    deleteItem, updateItem, createDepartment } from '../resources/item';
import { authorizeSuperAdminNext } from '../middlewares/user';
import { uploadPicture } from '../middlewares/imageloader';

export const router = express.Router()

router.post('/create-dept', createDepartment)

router.get('/items', getItem)

router.post('/items/department', getAllDrinksDepartment)
router.post('/items/category', getItemsInCategory)
router.post('/new-item', authorizeSuperAdminNext, addNewItem)
router.post('/upload', uploadPicture)

router.put('/update-item', authorizeSuperAdminNext, updateItem)

router.delete('/delete-item', authorizeSuperAdminNext, deleteItem )

module.exports = router;