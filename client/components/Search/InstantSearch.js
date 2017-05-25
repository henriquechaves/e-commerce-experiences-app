import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import algoliasearch from 'algoliasearch';

import { addProducts, fetchProducts } from '../../actions/ProductsActions';

import conf from '../../../server/config.js';

import styles from '../../assets/css/instantSearch.css';


const client = algoliasearch(conf.algoliaAppID, conf.algoliaClientKey);
const index = client.initIndex(conf.algoliaIndexName);

class InstantSearch extends Component {

  handleSearchProducts = () => {
    let search = this.refs.search.value;
    if(search === '') {
      this.props.dispatch(fetchProducts());
    } else {
      index.search(search).then(content =>
        this.updateResultSearch(content)
      );
    }
  }

  handleBtnClear = () => {
    this.refs.search.value = '';
    this.props.dispatch(fetchProducts());
  }

  updateResultSearch = (content) => {
    const products = content.hits.map((hit) => {
      return {
        __v: hit.__v,
        _id: hit._id,
        cuid: hit.cuid,
        name: hit.name,
        title: hit.title,
        description: hit.description,
        content: hit.content,
        stock: hit.stock,
        price: hit.price,
        image_url: hit.image_url,
        slug: hit.slug,
        dateAdded: hit.dateAdded,
        dateUpdated: hit.dateUpdated,
      }
    });
    this.props.dispatch(addProducts(products));
  }

  render() {
    return (
      <form className="form-inline text-right" role="search">
        <div className="input-group text-right">
          <input
            className={`form-control ${styles.inputSearch}`}
            type="search"
            onChange={this.handleSearchProducts}
            placeholder="Search..."
            ref="search"
          />
          <span className="input-group-btn">
              <button onClick={this.handleBtnClear} className={`btn ${styles.btnSearch}`} type="button">
                Clear
              </button>
          </span>
        </div>
      </form>
    );
  }
}

// Retrieve data from state as props
  function mapStateToProps(state) {
    return {
      search: state.search,
    };
  }


InstantSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(InstantSearch);
