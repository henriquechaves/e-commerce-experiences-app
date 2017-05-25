import * as actions from '../actions/ActionCreators';

const initialState = {
    showCart: false,
    cart: [],
    cartProcessed: false,
};

let newcart;

const CartReducer = (state = initialState, action) => {
  switch (action.type) {

    case actions.TOGGLE_SHOW_CART:
      return Object.assign({}, state, { showCart: !state.showCart });

    case actions.ADD_TO_CART:
      return Object.assign({}, state, { cart: [ action.product, ...state.cart ] });

    case actions.INCREMENT_ON_CART:
      newcart = state.cart.map((elem) => {
        if(elem.cuid === action.cuid) elem.amount++;
        return elem;
      });
      return Object.assign({}, state, { cart: newcart });

    case actions.DECREMENT_ON_CART:
      newcart = state.cart.map((elem) => {
        if(elem.cuid === action.cuid) elem.amount--;
        return elem;
      });
      return Object.assign({}, state, { cart: newcart });

    case actions.REMOVE_FROM_CART:
      newcart = state.cart.filter((elem) => {
        if(elem.cuid === action.cuid) return false;
        else return elem;
      });
      return Object.assign({}, state, { cart: newcart });

    case actions.SET_CART_PROCESSED:
      return Object.assign({}, state, { cartProcessed: true, cart: [] });

    default:
      return state;
  }
};

export const getShowCart = state => state.cart.showCart;

export const getCart = state => state.cart.cart;

export const getCartProcessed = state => state.cart.cartProcessed;

export default CartReducer;
