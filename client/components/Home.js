import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import Cart from './Cart/Cart';
import List from './List';
import Pagination from './Pagination/Pagination';

// Import Actions
import { fetchProducts, deleteProductRequest } from '../actions/ProductsActions';
import { changePage } from '../actions/AppActions';
import { addToCart, increaseProductOnCart, toggleShowCart } from '../actions/CartActions';

// Import Reducers
import { getProducts } from '../reducers/ProductsReducer';
import { getActivePage } from '../reducers/AppReducer';
import {
  getShowCart,
  getCart,
  getCartProcessed
} from '../reducers/CartReducer';

import config from '../../server/config';

// Import Style
import styles from '../assets/css/home.css';

export class Home extends Component {
  componentDidMount() {
    this.props.dispatch(changePage(1));
    this.props.dispatch(fetchProducts());
  }

  handleChangePage = (newPage) => {
    this.props.dispatch(changePage(newPage));
  }

  handleAddToCart = (e, product) => {
    e.preventDefault();

    if(product.stock === 0) {
      confirm(`Product unavailable - ${product.title}.`);
      return;
    }

    let isProductOnCart = this.props.cart.find((elem) => {
      return (elem.cuid===product.cuid);
    });

    if((typeof isProductOnCart !== 'undefined') && (product.stock <= isProductOnCart.amount)) {
      confirm(`${product.title} - Product limit: ${product.stock}.`);
      return;
    }

    if(typeof isProductOnCart === 'undefined')
      this.props.dispatch(addToCart(Object.assign({}, product, { amount: 1 })));
    else
      this.props.dispatch(increaseProductOnCart(product.cuid));

    if( !this.props.showCart )
      this.props.dispatch(toggleShowCart());

  };

  handleDeleteProduct = cuid => {
    if (confirm('Do you want to delete this product?')) { // eslint-disable-line
      this.props.dispatch(deleteProductRequest(cuid));
    }
  };

  render() {

    let startWindow = (this.props.activePage-1) * config.ITEMS_PER_PAGE;
    let endWindow = startWindow + config.ITEMS_PER_PAGE;
    let paginatedData = this.props.list.slice(startWindow, endWindow);
    let total = this.props.list.length;

    return (
            <div className={`container-fluid ${styles.homeWrapper}`}>
                <Cart
                  handleAddToCart={this.handleAddToCart}
                />
                <div className="container">
                    <List
                      list={paginatedData}
                      addToCart={this.handleAddToCart}
                      onDeleteProduct={this.handleDeleteProduct}
                    />
                </div>
                {total > config.ITEMS_PER_PAGE && <Pagination
                    itemsCountPerPage={config.ITEMS_PER_PAGE}
                    totalItemsCount={total}
                    activePage={this.props.activePage}
                    onChange={this.handleChangePage}
                    activeClass="active"
                                                  />}
            </div>
    );
  }
}

Home.need = [(params) => {
  return fetchProducts();
}];

function mapStateToProps(state) {
  return {
    list: getProducts(state),
    activePage: getActivePage(state),
    showCart: getShowCart(state),
    cart: getCart(state),
    cartProcessed: getCartProcessed(state),
  };
}

Home.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    cuid: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    stock: PropTypes.number,
    price: PropTypes.string,
    weight: PropTypes.number,
    image_url: PropTypes.string,
    slug: PropTypes.string,
  })).isRequired,
  activePage: PropTypes.number.isRequired,
  showCart: PropTypes.bool.isRequired,
  cart: PropTypes.array.isRequired,
  cartProcessed: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Home.contextTypes = { router: PropTypes.object };

export default connect(mapStateToProps)(Home);
