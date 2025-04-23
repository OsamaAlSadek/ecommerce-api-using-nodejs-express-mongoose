import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'SubCategory must be unique'],
      minlength: [2, 'Too short SubCategory name'],
      maxlength: [32, 'Too long SubCategory name'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'SubCategory must belong to a Category'],
    },
  },
  { timestamps: true },
);

export default mongoose.model('SubCategory', subCategorySchema);
