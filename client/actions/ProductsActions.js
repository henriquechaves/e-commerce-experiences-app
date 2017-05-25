import * as actions from './ActionCreators';

import { addPhoto, albumName } from '../util/aws';
import api from '../util/app';
import conf from '../../server/config.js';
import {
  insertProductAlgolia,
  updateProductAlgolia,
  deleteProductAlgolia
} from '../util/algolia';

export function addProduct(product) {
  return {
    type: actions.ADD_PRODUCT,
    product,
  };
}

export function addProducts(products) {
  return {
    type: actions.ADD_PRODUCTS,
    products,
  };
}

export function editProduct(product) {
  return {
    type: actions.EDIT_PRODUCT,
    product,
  };
}

export function deleteProduct(cuid) {
  return {
    type: actions.DELETE_PRODUCT,
    cuid,
  };
}

export function searchProducts(cuids) {
  return {
    type: actions.SEARCH_PRODUCTS,
    cuids,
  };
}

export function fetchProduct(cuid) {
  return (dispatch) => {
    return api(conf.PRODUCTS_API_URL, `products/${cuid}`)
    .then(res => dispatch(addProduct(res.product)));
  };
}

export function fetchProducts() {
  return (dispatch) => {
    return api(conf.PRODUCTS_API_URL, 'products')
    .then(res => {
      dispatch(addProducts(res.products));
    });
  };
}

export function deleteProductRequest(cuid) {
  return (dispatch) => {
    return api(conf.PRODUCTS_API_URL, `products/${cuid}`, 'delete')
    .then(() => deleteProductAlgolia(cuid))
    .then(() => dispatch(deleteProduct(cuid)));
  };
}

export function addProductRequest(product) {
  return (dispatch) => {
    return api(conf.PRODUCTS_API_URL, 'products', 'post', product)
    .then(res => insertProductAlgolia(res.product))
    .then(product => dispatch(addProduct(product)));
  };
}

export function editProductRequest(product) {
  return (dispatch) => {
    return addPhoto(product.image)
    .then(url => api(
                    conf.PRODUCTS_API_URL,
                    `products/edit/${product.cuid}`,
                    'post',
                    Object.assign({}, product, { image_url: url })
                  )
    )
    .then(res => updateProductAlgolia(res.product))
    .then(product => dispatch(editProduct(product)))
  };
}
