import { check } from 'express-validator';
import validatorMiddleware from '../../middlewares/validatoinMiddleware.js';
import CategoryModel from '../../models/categoryModel.js';
import SubCategoryModel from '../../models/subCategoryModel.js';

export const getProductValidator = [
  check('id').isMongoId().withMessage('Invalid Product id format'),
  validatorMiddleware,
];

export const createProductValidator = [
  check('name')
    .notEmpty()
    .withMessage('Product name is required')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('Name length 3‑100 chars'),
  check('description')
    .notEmpty()
    .withMessage('Product description is required')
    .bail()
    .isLength({ max: 2000 })
    .withMessage('Too long Product description'),
  check('quantity').isInt({ min: 0 }).withMessage('Quantity ≥ 0'),
  check('sold')
    .optional()
    .isNumeric()
    .withMessage('Product sold must be a number'),
  check('price')
    .isFloat({ min: 0 })
    .withMessage('Price ≥ 0')
    .isLength({ max: 1000000 })
    .withMessage('Too long Product price'),
  check('priceAfterDiscount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('PriceAfterDiscount ≥ 0')
    .custom((val, { req }) => {
      if (req.body.price <= val) {
        throw new Error(
          'Product price after discount must be lower than price',
        );
      }
      return true;
    }),
  check('colors')
    .optional()
    .isArray()
    .withMessage('Product colors must be an array of strings'),
  check('images')
    .optional()
    .isArray()
    .withMessage('Product images must be an array of strings'),
  check('imageCover')
    .notEmpty()
    .withMessage('Product image cover is required')
    .isString()
    .withMessage('Product image cover must be a string'),
  check('category')
    .isMongoId()
    .withMessage('Invalid category ID')
    .bail()
    .custom(async (categoryId) => {
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        throw new Error(`No category found for ID: ${categoryId}`);
      }
    }),
  check('subCategories')
    .optional()
    .isArray({ min: 1 })
    .withMessage('subcategories must be non-empty Array')
    .bail()
    .isMongoId()
    .withMessage('Invalid subCategory ID')
    .custom(async (subCategoriesId) => {
      const subCategories = await SubCategoryModel.find({
        _id: { $in: subCategoriesId },
      });
      if (subCategories.length !== subCategoriesId.length) {
        throw new Error(`No subcategory found for ID: ${subCategoriesId}`);
      }
      return true;
    })
    .bail()
    .custom((val, { req }) =>
      SubCategoryModel.find({ category: req.body.category }).then(
        (subCategories) => {
          const subCategoriesIdsInDB = [];
          subCategories.forEach((subCategory) => {
            subCategoriesIdsInDB.push(subCategory._id.toString());
          });
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subCategoriesIdsInDB)) {
            return Promise.reject(
              new Error(`subcategories not belong to category`),
            );
          }
        },
      ),
    ),
  check('brand')
    .optional()
    .isMongoId()
    .withMessage('Invalid brand id format')
    .isString()
    .withMessage('Product brand must be a string'),
  check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('Product ratings average must be a number')
    .isLength({ min: 1, max: 5 })
    .withMessage('Rating must be >= 1.0 and <= 5.0'),
  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('Product ratings quantity must be a number'),
  validatorMiddleware,
];

export const updateProductValidator = [
  check('id').isMongoId().withMessage('Invalid Product id format'),
  validatorMiddleware,
];

export const deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid Product id format'),
  validatorMiddleware,
];
