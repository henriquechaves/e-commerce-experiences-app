import * as actions from './ActionCreators';
import api from '../util/app';
import conf from '../../server/config.js';

export function toggleShowCart() {
  return {
    type: actions.TOGGLE_SHOW_CART,
  };
}

export function addToCart(product) {
  return {
    type: actions.ADD_TO_CART,
    product,
  };
}

export function increaseProductOnCart(cuid) {
  return {
    type: actions.INCREMENT_ON_CART,
    cuid,
  };
}

export function decreaseProductOnCart(cuid) {
  return {
    type: actions.DECREMENT_ON_CART,
    cuid,
  };
}

export function removeProductFromCart(cuid) {
  return {
    type: actions.REMOVE_FROM_CART,
    cuid,
  };
}

export function setCartProcessed() {
  return {
    type: actions.SET_CART_PROCESSED,
  };
}

export function processCartPayment(token, cart) {
  const vendas = cart.map(v => {
    return {
      cuid: v.cuid,
      price: v.price,
      amount: v.amount,
    }
  });
  return (dispatch) => {
    return api(conf.CART_API_URL, 'carts', 'post', {token: token, cart: vendas})
          .then(cart => api(conf.STRIPE_API_URL, 'products', 'post', cart))
          .then(res => {
            if(res) {
              dispatch(setCartProcessed());
            } else {
              return;
            }
          })
  };
}
