import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addProductRequest } from '../actions/ProductsActions';

import styles from '../assets/css/itemEdit.css';

export class Insert extends Component {
  handleInsertProduct = (e) => {

    e.preventDefault();

    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const descRef = this.refs.description;
    const contentRef = this.refs.content;
    const stockRef = this.refs.stock;
    const priceRef = this.refs.price;
    const weightRef = this.refs.weight;

    if (
      nameRef.value &&
      titleRef.value &&
      descRef.value &&
      contentRef.value &&
      stockRef.value &&
      priceRef.value &&
      weightRef.value
    ) {
      const newProduct = {
        name: nameRef.value,
        title: titleRef.value,
        description: descRef.value,
        content: contentRef.value,
        stock: stockRef.value,
        price: priceRef.value,
        weight: weightRef.value,
      };

      this.props.dispatch(addProductRequest(newProduct));
      confirm("Product inserted sucessfully.");

      titleRef.value = priceRef.value= descRef.value = contentRef.value
      = estoqueRef.value = pesoRef.value = volumeRef.value = '';
    }
    confirm("the fields are needed");
    return;
  };

  render() {
    return (
      <div className={`container ${styles.itemEditWrapper}`}>
        <form method="POST" onSubmit={this.handleInsertProduct} className="">
          <div className="form-group">
            <label>Product Name</label>
            <input placeholder="Product Name" className={`form-control ${styles.field}`} ref="name" name="name" />
          </div>
          <div className="form-group">
            <label>Product Title</label>
            <input placeholder="Product Title" className={`form-control ${styles.field}`} ref="title" name="title" />
          </div>
          <div className="form-group">
            <label>Product Stock</label>
            <input placeholder="Product Stock" className={`form-control ${styles.field}`} ref="stock" name="stock" />
          </div>
          <div className="form-group">
            <label>Product Price</label>
            <input placeholder="Product Price" className={`form-control ${styles.field}`} ref="price" name="price" />
          </div>
          <div className="form-group">
            <label>Product Weith</label>
            <input placeholder="Product Weight" className={`form-control ${styles.field}`} ref="weight" name="weight" />
          </div>
          <div className="form-group">
            <label>Product Description</label>
            <textarea placeholder="Product Description" className={`form-control ${styles.field}`} ref="description" name="description" />
          </div>
          <div className="form-group">
            <label>Product Content</label>
            <textarea placeholder="Product Content" className={`form-control ${styles.field}`} ref="content" name="content" />
          </div>
          <div>
            <button type="submit" className={`btn btn-primary ${styles.btnSubmit}`}>
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Insert.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Insert);
