import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from '../assets/css/itemDetail.css';

import { fetchProduct } from '../actions/ProductsActions';

import { getProduct } from '../reducers/ProductsReducer';

export class ItemDetail extends Component {
  render() {
    return (
      <div className={`container rounded ${styles.detailWrapper}`}>
        <div className="row">
          <div className="col-md-4">
              <img className={`img-fluid ${styles.detailImg}`} src={`${this.props.product.image_url}`} alt={this.props.product.name} />
          </div>
          <div className="col-md-8">
            <p className={`h1 ${styles.detailName}`}>{this.props.product.name}</p>
            <p className={`h3 ${styles.detailTitle}`}>{this.props.product.title}</p>
            <p className={`h5 ${styles.detailDescription}`}>{this.props.product.description}</p>
            <p className={`h5 ${styles.detailContent}`}>{this.props.product.content}</p>
            <Link className="btn btn-warning" to="/">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
ItemDetail.need = [params => {
  return fetchProduct(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return { product: getProduct(state, props.match.params.cuid) };
}

ItemDetail.propTypes = {
  product: PropTypes.shape({
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
  }).isRequired,
};

export default connect(mapStateToProps)(ItemDetail);
