import express from 'express';
import { getItem, addNewItem, getItemsInCategory, getAllDrinksDepartment } from '../resources/item';
import { authorizeSuperAdminNext } from '../middlewares/user';
import { uploadPicture } from '../middlewares/imageloader';

export const router = express.Router()


router.get('/items', getItem)
router.post('/items/department', getAllDrinksDepartment)
router.post('/items/category', getItemsInCategory)

router.post('/new-item', authorizeSuperAdminNext, addNewItem)
router.post('/upload', uploadPicture)

module.exports = router;