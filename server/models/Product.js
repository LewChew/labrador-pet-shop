const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'A product must have a description'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      min: [0, 'Price must be positive']
    },
    category: {
      type: String,
      required: [true, 'A product must have a category'],
      enum: {
        values: ['food', 'toys', 'accessories', 'health', 'grooming', 'training'],
        message: 'Category must be one of: food, toys, accessories, health, grooming, training'
      }
    },
    ageRange: {
      type: String,
      enum: {
        values: ['puppy', 'adult', 'senior', 'all'],
        message: 'Age range must be one of: puppy, adult, senior, all'
      },
      default: 'all'
    },
    images: [String],
    mainImage: String,
    stock: {
      type: Number,
      required: [true, 'A product must have stock information'],
      min: [0, 'Stock cannot be negative']
    },
    brand: String,
    featured: {
      type: Boolean,
      default: false
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot exceed 5'],
        set: (val) => Math.round(val * 10) / 10 // Round to 1 decimal place
      },
      count: {
        type: Number,
        default: 0
      }
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: [true, 'Review must belong to a user']
        },
        rating: {
          type: Number,
          required: [true, 'Review must have a rating'],
          min: 1,
          max: 5
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    labSpecific: {
      type: Boolean,
      default: true
    },
    benefits: [String],
    weight: Number,
    dimensions: String,
    ingredients: [String],
    salePrice: Number,
    onSale: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.onSale && this.salePrice) {
    return Math.round(((this.price - this.salePrice) / this.price) * 100);
  }
  return 0;
});

// Index for searching
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
