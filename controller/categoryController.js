import asyncHandler from 'express-async-handler';
import slugify from 'slugify';

import Category from '../models/categoryModel.js';
import ApiError from '../utils/apiError.js';

// @route   GET /api/v1/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @route   GET /api/v1/categories/:id
// @access  Public
export const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`No category found for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @route   POST  /api/v1/categories
// @access  Private
export const createCategory = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const category = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @route   PUT /api/v1/categories/:id
// @access  Private
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true },
  );

  if (!category) {
    return next(new ApiError(`No category found for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @route   DELETE /api/v1/categories/:id
// @access  Private
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError(`No category found for this id ${id}`, 404));
  }
  res.status(204).send();
});
