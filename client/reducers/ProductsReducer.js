import * as actions from '../actions/ActionCreators';

const initialState = {
  data: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {

    case actions.SEARCH_PRODUCTS:
      return {
        data: state.data.filter(product => action.cuids.some(cuid => cuid === product.cuid)),
      };

    case actions.ADD_PRODUCT :
      return {
        data: [action.product, ...state.data],
      };

    case actions.ADD_PRODUCTS :
      return {
        data: action.products,
      };

    case actions.EDIT_PRODUCT :
      return {
        data: [action.product],
      };

    case actions.DELETE_PRODUCT :
      return {
        data: state.data.filter(product => product.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

export const getProducts = state => state.products.data;

export const getProduct = (state, cuid) => {
  return state.products.data.filter(product => product.cuid === cuid)[0];
}

export default ProductReducer;
