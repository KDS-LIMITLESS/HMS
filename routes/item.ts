import express from 'express';
import { getItem, addNewItem, getItemsInCategory } from '../resources/item';
import { authorizeSuperAdminNext } from '../middlewares/user';

export const router = express.Router()


router.get('/items', getItem)
router.get('/items/category', getItemsInCategory)

router.post('/new-item',authorizeSuperAdminNext, addNewItem)

module.exports = router;