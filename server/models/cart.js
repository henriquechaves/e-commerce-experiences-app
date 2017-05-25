import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const prods = new Schema({
  cuid: { type: 'String', required: true },
  price: { type: 'String', required: true },
  amount: { type: 'Number', required: true },
});

const cartSchema = new Schema({
  cuid: { type: 'String', required: true },
  token: { type: 'String', required: true },
  email: { type: 'String', required: true },
  funding: { type: 'String', required: true },
  isPaid: { type: 'Boolean', default: false, required: true },
  isDelivered: { type: 'Boolean', default: false, required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  dateUpdated: { type: 'Date', default: '', required: false },
  prods: { type: [prods], required: true },
});

export default mongoose.model('Cart', cartSchema);
