import { Schema, model } from 'mongoose';
// 1- Create Schema
const categorySchema = new Schema({
  name: String,
});

// 2- Create model
const CategoryModel = model('Category', categorySchema);

export default CategoryModel;
