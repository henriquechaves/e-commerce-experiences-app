import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import InstantSearch from '../Search/InstantSearch';

import { toggleShowCart } from '../../actions/CartActions';

import styles from '../../assets/css/header.css';

export class Header extends Component {

  toggleShowCartSection = () => {
    this.props.dispatch(toggleShowCart());
  };

  render() {
    return (
          <nav className={`navbar fixed-top navbar-toggleable-sm navbar-inverse bg-inverse ${styles.navbarHeader}`}>
              <button
                  className="navbar-toggler navbar-toggler-right"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
              >
                  <span className="navbar-toggler-icon" />
              </button>
              <Link className={`navbar-brand rounded ${styles.navbarBrandHeader}`} to="/">
                  <img src="" alt="Brand Logo" />
              </Link>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                      <li className={`nav-item ${styles.navbarTitle}`}>
                          <div className={`${styles.navbarTitle}`}>Vendedor</div>
                      </li>
                      <li className={`nav-item ${styles.navbarTitle}`}>
                          <a href="/insert" className="nav-link">Add Product</a>
                      </li>
                      <li className={`nav-item ${styles.navbarTitle}`}>
                          <a href="#" onClick={this.toggleShowCartSection} className="nav-link">My Cart</a>
                      </li>
                  </ul>
                  <InstantSearch />
              </div>
          </nav>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(Header);
