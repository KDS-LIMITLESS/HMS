import express from 'express';
import { getItem, addNewItem, getItemsInCategory, getAllDrinksDepartment, 
    deleteItem, updateItem, filterItemsByDates } from '../resources/item';
import { authorizeSuperAdminNext, authorizeStoreManager } from '../middlewares/user';
import { uploadPicture } from '../middlewares/imageloader';

export const router = express.Router()


router.get('/items', getItem)

router.post('/items/department', getAllDrinksDepartment)
router.post('/items/category', getItemsInCategory)
router.post('/new-item', authorizeSuperAdminNext, authorizeStoreManager, addNewItem) // add item
router.post('/upload', uploadPicture)
router.post('/dates-filter', filterItemsByDates)

router.put('/update-item', authorizeSuperAdminNext, updateItem)

router.delete('/delete-item', authorizeSuperAdminNext, deleteItem )

module.exports = router;