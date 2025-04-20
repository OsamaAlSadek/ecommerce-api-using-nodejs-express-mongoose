import { Router } from 'express';
import {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator,
} from '../utils/validators/brandValidator.js';

import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from '../controller/brandController.js';

const router = Router();

router.route('/').get(getBrands).post(createBrandValidator, createBrand);
router
  .route('/:id')
  .get(getBrandValidator, getBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export default router;
