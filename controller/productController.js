import asyncHandler from 'express-async-handler';
import slugify from 'slugify';

import Product from '../models/productModel.js';
import ApiError from '../utils/apiError.js';

// @route   GET /api/v1/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const product = await Product.find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: 'category', select: 'name' });
  res.status(200).json({ results: product.length, page, data: product });
});

// @route   GET /api/v1/Products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError(`No Product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @route   POST  /api/v1/Products
// @access  Private
export const createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.name);

  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @route   PUT /api/v1/Products/:id
// @access  Private
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!product) {
    return next(new ApiError(`No Product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @route   DELETE /api/v1/Products/:id
// @access  Private
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new ApiError(`No Product for this id ${req.params.id}`, 404));
  }
  res.status(204).send();
});
