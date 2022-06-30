import express from 'express';
import { getItem, addNewItem, getItemsInCategory } from '../resources/item';
import { authorizeSuperAdmin } from '../middlewares/user';

export const router = express.Router()


router.get('/items', getItem)
router.get('/items/category', getItemsInCategory)

router.post('/new-item',authorizeSuperAdmin, addNewItem)

module.exports = router;