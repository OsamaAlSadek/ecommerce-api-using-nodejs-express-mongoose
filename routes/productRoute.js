import express from 'express';
import subCategoryRoute from './subCategoryRoute.js';

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controller/productController.js';
import {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
} from '../utils/validators/productValidator.js';

const router = express.Router();

// Nested Route
router.use('/:categoryId/subcategories', subCategoryRoute);

router.route('/').get(getProducts).post(createProductValidator, createProduct);

router
  .route('/:id')
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default router;
