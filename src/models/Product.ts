import { Schema, models, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  supplier: { type: String, required: true },
});

const Product = models['product'] || model('product', productSchema);

export default Product;
