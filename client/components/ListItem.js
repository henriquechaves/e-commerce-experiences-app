import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from '../assets/css/listItem.css';

function ListItem(props) {
  const isDisabled = props.item.stock > 0 ? '' : 'disabled';
  return (
        <div className={`col-md-4 ${styles.itemWrapper}`}>
            <div className={`card ${styles.myCard}`}>
                <img className={`card-img-top mx-auto d-block img-responsive ${styles.itemImage}`} src={props.item.image_url} alt={props.item.name} />
                <div className="card-block justify-content-between">
                    <h4 className="card-title">{props.item.name}</h4>
                    <h5 className="card-text">{props.item.title}</h5>
                    <h5 className="card-text">${props.item.price}</h5>
                    <div className="row">
                      <div className="text-left">
                        <Link className="btn btn-warning text-left" to={`/detail/${props.item.cuid}`} >
                          View Details
                        </Link>
                      </div>
                      <div className="text-right">
                        <Link className={`btn btn-warning text-right ${isDisabled}`} to="#" onClick={(e) => props.addToCart(e, props.item)} id="addToCart">
                          add to Cart
                        </Link>
                      </div>
                    </div>

                    <p className='post-action'>
                      <a href="#" onClick={() => props.onDeleteProduct(props.item.cuid)}>Delete</a> |
                      <Link to={`/edit/${props.item.cuid}`} > Edit</Link>
                    </p>
                </div>
            </div>
        </div>
  );
}



ListItem.propTypes = {
  item: PropTypes.shape({
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
  addToCart: PropTypes.func.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
};

export default ListItem;
