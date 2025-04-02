import { Router } from 'express';

import { getCategories } from '../controller/categoryController.js';

const router = Router();

router.get('/', getCategories);

export default router;
