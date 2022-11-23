import express from 'express';
import { getItem, addNewItem, getItemsInCategory, getAllDrinksDepartment, 
    deleteItem, updateItem, filterItemsByDates, updateItemQuantity,
    updateItemReorderLevel } from '../resources/product';
import { authorizeSuperAdminNext, authorizeStoreManager } from '../middlewares/user';
import { uploadPicture } from '../middlewares/imageloader';

export const router = express.Router()


router.get('/items', getItem)

router.post('/items/department', getAllDrinksDepartment)
router.post('/items/category', getItemsInCategory)
router.post('/new-item', authorizeStoreManager, addNewItem) // add item
router.post('/upload', uploadPicture)
router.post('/dates-filter', filterItemsByDates)

router.put('/update-item', authorizeSuperAdminNext, updateItem)
router.put('/update-quantity', authorizeStoreManager,updateItemQuantity)
router.put('/update-reorder-level', authorizeStoreManager, updateItemReorderLevel)
router.delete('/delete-item', authorizeStoreManager, deleteItem )

module.exports = router;