import { combineReducers } from 'redux';

import app from './AppReducer';
import cart from './CartReducer';
import products from './ProductsReducer';

export default combineReducers({
  app,
  cart,
  products,
});
