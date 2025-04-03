import { Schema, model } from 'mongoose';
// 1- Create Schema
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category required'],
      unique: [true, 'Category must be unique'],
      minlength: [3, 'Too short category name'],
      maxlength: [32, 'Too long category name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true },
);

// 2- Create model
const CategoryModel = model('Category', categorySchema);

export default CategoryModel;
