import express from 'express';
import { getItem, addNewItem } from '../resources/item';

export const router = express.Router()


router.get('/items', getItem)

router.post('/new-item',addNewItem)
//router.get('/items/category', getItemsInCategory)
//
module.exports = router;