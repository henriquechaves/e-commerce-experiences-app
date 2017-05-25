import React from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

import styles from '../assets/css/list.css';

function List(props) {
  return (
        <div className={`row ${styles.listWrapper}`}>
            {props.list.map(item =>
                <ListItem
                  key={item.cuid}
                  item={item}
                  addToCart={props.addToCart}
                  onDeleteProduct={props.onDeleteProduct}
                />
            )}
        </div>
  );
}

List.propTypes = {
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
  addToCart: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
};

export default List;
