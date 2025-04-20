import asyncHandler from 'express-async-handler';
import slugify from 'slugify';

import SubCategory from '../models/subCategoryModel.js';
import ApiError from '../utils/apiError.js';

// Nested Route
// @route   GET /api/v1/categories/categoryId/subcategories
export const createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };

  req.filterObj = filterObject;
  next();
};

// @route   GET /api/v1/subcategories
// @access  Public
export const getSubCategories = asyncHandler(async (req, res) => {
  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategory.find(req.filterObj)
    .skip(skip)
    .limit(limit)
    .populate({ path: 'category', select: 'name' });

  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @route   GET /api/v1/subcategories/:id
// @access  Public
export const getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findById(id);

  if (!subcategory) {
    return next(new ApiError(`No subcategory found for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});

export const setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

// @route   POST  /api/v1/subcategories
// @access  Private
export const createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const subcategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subcategory });
});

// @route   PUT /api/v1/subcategories/:id
// @access  Private
export const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const subcategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true },
  );

  if (!subcategory) {
    return next(new ApiError(`No subcategory found for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});

// @route   DELETE /api/v1/subcategories/:id
// @access  Private
export const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findByIdAndDelete(id);

  if (!subcategory) {
    return next(new ApiError(`No subcategory found for this id ${id}`, 404));
  }
  res.status(204).send();
});
