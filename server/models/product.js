import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  cuid: { type: 'String', required: true },
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  description: { type: 'String', required: true },
  content: { type: 'String', required: true },
  stock: { type: 'Number', min: 0, required: true },
  price: { type: 'String', required: true },
  weight: { type: 'Number', min: 1, required: true },
  image_url: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: false },
  dateUpdated: { type: 'Date', default: Date.now, required: false },
});

export default mongoose.model('Product', productSchema);
