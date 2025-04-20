import { check } from 'express-validator';
import validatorMiddleware from '../../middlewares/validatoinMiddleware.js';

export const getSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Subcategory id format'),
  validatorMiddleware,
];

export const createSubCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('SubCategory name is required')
    .isLength({ min: 2 })
    .withMessage('SubCategory name must be at least 2 characters long')
    .isLength({ max: 32 })
    .withMessage('SubCategory name must be at most 32 characters long'),
  check('category')
    .notEmpty()
    .withMessage('SubCategory must be belongs to Category ')
    .isMongoId()
    .withMessage('Invalid Category id format'),
  validatorMiddleware,
];

export const updateSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Subcategory id format'),
  validatorMiddleware,
];

export const deleteSubCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid Subcategory id format'),
  validatorMiddleware,
];
