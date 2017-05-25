import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import conf from '../../../server/config';

import { getShowCart, getCart, getCartProcessed } from '../../reducers/CartReducer';

import { addToCart, increaseProductOnCart, removeProductFromCart, decreaseProductOnCart, processCartPayment } from '../../actions/CartActions';

const keyPublishable = conf.stripePublishableKey;

import styles from '../../assets/css/cart.css';

export class Cart extends Component {

  handleremoveProductFromCart = (e, cuid) => {
    e.preventDefault();

    let has = this.props.cart.find((elem) => {
      return (elem.cuid===cuid);
    });
    // produto nao existe:
    if(typeof has === 'undefined') return;

    let hasone = this.props.cart.find((elem) => {
      return ((elem.cuid===cuid) && (elem.amount===1));
    });
    // existe mais de 1 produto:
    if(typeof hasone === 'undefined')
      this.props.dispatch(decreaseProductOnCart(cuid));
    // existe apenas 1 produto:
    else
      this.props.dispatch(removeProductFromCart(cuid));
  };

  handleProcessPayCart = (token, cart) => {
    this.props.dispatch(processCartPayment(token, cart));
  }

  number = (value) => {
    const n = Math.round(value*100)/100;
    return n.toFixed(2);
  }

  img = (img) => {
    if(img === 'image') {
      return '';
    } else {
      return <img className='img-responsive img-center' src={img} />;
    }
  }

  head = () => {
    return (
      <div className="row thumbnail">
        <div className="col-lg-7 text-center">Product</div>
        <div className="col-lg-1">Price</div>
        <div className="col-lg-1">Amount</div>
        <div className="col-lg-1">Valor</div>
        <div className="col-lg-2">Actions</div>
      </div>
    )
  }

  line = (p) => {
    return (
      <div className="row thumbnail" key={p.cuid}>
        <div className="col-lg-2">{this.img(p.image)}</div>
        <div className="col-lg-5">{p.title}</div>
        <div className="col-lg-1">{this.number(p.price)}</div>
        <div className="col-lg-1">{p.amount}</div>
        <div className="col-lg-1">{this.number(p.amount*p.price)}</div>
        <div className="col-lg-2">
          <a href="#" onClick={(e) => this.props.handleAddToCart(e,p)}>Add</a> |
          <a href="#" onClick={(e) => this.handleremoveProductFromCart(e,p.cuid)}>Del</a>
        </div>
      </div>
    )
  }

  emptyCart = () => {
    return (
      <div className="row thumbnail">
        <div className="col-lg-12">
          Seu Cart esta vazio.
        </div>
      </div>
    )
  }

  footer = (total) => {
    const proc = (this.props.cartProcessed)?'cartProcessed':'';
    return (
      <div className={`row thumbnail ${styles.cartTotal}`}>
        <div className="col-lg-8">{proc}</div>
        <div className="col-lg-1"><b>Total:</b></div>
        <div className="col-lg-1">{this.number(total)}</div>
        <div className="col-lg-2">
          { this.stripe(total*100) }
        </div>
      </div>
    )
  }

  content = () => {
    if(this.props.cart.length>0) {
      let total = 0;
      const res = this.props.cart.map(p => {
        if(typeof p === 'string') return '';
        total += p.amount*p.price;
        return this.line(p);
      });
      return (
        <div className={styles["background"]}>
          {this.head()}
          {res}
          {this.footer(total)}
        </div>
      )
    } else {
      return this.emptyCart();
    }
  }

  form = () => {
    if(this.props.cart.length=0) return "";
    return (
      <form action="/charge" method="POST">
        <script
          src="//checkout.stripe.com/v2/checkout.js"
          className="stripe-button"
          data-key={keyPublishable}
          data-locale="auto"
          data-description="Sample Charge"
          data-amount="500"
        ></script>
        <button type="submit" className="stripe-button-el"></button>
      </form>
    )
  }

  stripe = (amount) => {
    return (
      <div>
        <StripeCheckout
          amount={amount}
          email="adienwelden@gmail.com"
          token={this.onToken}
          stripeKey={keyPublishable}
        >
        <button className="btn btn-primary">
          Pay
        </button>
        </StripeCheckout>
      </div>
    )
  }

  onToken = (token) => {
    this.handleProcessPayCart(token, this.props.cart);
  }

  render() {
    const cls = `${(this.props.showCart ? styles.appear : styles.desappear)}`;
    return (
      <div className="container">
        <div className={cls}>
          { this.content() }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    showCart: getShowCart(state),
    cart: getCart(state),
    cartProcessed: getCartProcessed(state),
  };
}

Cart.propTypes = {
  showCart: PropTypes.bool.isRequired,
  cart: PropTypes.array.isRequired,
  cartProcessed: PropTypes.bool.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Cart);
