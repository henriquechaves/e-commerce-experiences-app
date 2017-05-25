import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchProduct, editProductRequest } from '../actions/ProductsActions';

import { getProduct } from '../reducers/ProductsReducer';

import styles from '../assets/css/itemEdit.css';

let file = null;

export class Edit extends Component {
  handleEditProduct = (e) => {
    e.preventDefault();

    const cuid = this.props.product.cuid;
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const descRef = this.refs.description;
    const contentRef = this.refs.content;
    const stockRef = this.refs.stock;
    const priceRef = this.refs.price;
    const weightRef = this.refs.weight;

    const productimage = (this.img(this.props.product.image_url)!=='') ?
                          document.getElementById("product-image").src :
                          this.props.product.image_url;

    const dppi = this.props.product.image_url;
    const image = (
      (file != null)&&
      (file.name != null)&&
      (productimage != dppi)
    ) ? file : dppi;

    if (
      nameRef.value &&
      titleRef.value &&
      descRef.value &&
      contentRef.value &&
      stockRef.value &&
      priceRef.value &&
      weightRef.value
    ) {
      const productEdited = {
        cuid: cuid,
        name: nameRef.value,
        title: titleRef.value,
        description: descRef.value,
        content: contentRef.value,
        stock: stockRef.value,
        price: priceRef.value,
        weight: weightRef.value,
        image: image,
      };
      this.props.dispatch(editProductRequest(productEdited));
    }
  };

  handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    file = e.target.files[0];
    if(file) reader.readAsDataURL(file);
    reader.onload = () => {
      if(file.size>800000) {
        alert("Arquivo de imagem nao pode ser maior que 800kb.");
        reader.abort();
        file = reader = e.target = null;
        document.getElementById("product-image").src = this.props.product.image_url;
      } else {
        document.getElementById("product-image").src = reader.result;
      }};
  }

  img = (img) => {
    if(img === 'image') {
      return '';
    } else {
      return <img id='product-image' width='180px' height='180px' className={styles['form-image']} src={img} />;
    }
  }

  render() {
    return (
      <div className={`container ${styles.itemEditWrapper}`}>
        <form onSubmit={this.handleEditProduct} className="">
          { this.img(this.props.product.image_url) }
          <div className="form-group">
            <label>Image file: </label>
            <input
              type="file"
              defaultValue=""
              accept="image/*"
              onChange={this.handleImageChange}
              className={styles['form-file-field']}
              placeholder={'image eee'}
            />
          </div>
          <div className="form-group">
            <label>Product Name</label>
            <input placeholder="Product Name" defaultValue={this.props.product.name} className={`form-control ${styles.field}`} ref="name" name="name" />
          </div>
          <div className="form-group">
            <label>Product Title</label>
            <input placeholder="Product Title" defaultValue={this.props.product.title} className={`form-control ${styles.field}`} ref="title" name="title" />
          </div>
          <div className="form-group">
            <label>Product Stock</label>
            <input placeholder="Product Stock" defaultValue={this.props.product.stock}  className={`form-control ${styles.field}`} ref="stock" name="stock" />
          </div>
          <div className="form-group">
            <label>Product Price</label>
            <input placeholder="Product Price" defaultValue={this.props.product.price}  className={`form-control ${styles.field}`} ref="price" name="price" />
          </div>
          <div className="form-group">
            <label>Product Weith</label>
            <input placeholder="Product Weight" defaultValue={this.props.product.weight}  className={`form-control ${styles.field}`} ref="weight" name="weight" />
          </div>
          <div className="form-group">
            <label>Product Description</label>
            <textarea placeholder="Product Description" defaultValue={this.props.product.description} className={`form-control ${styles.field}`} ref="description" name="description" />
          </div>
          <div className="form-group">
            <label>Product Content</label>
            <textarea placeholder="Product Content" defaultValue={this.props.product.content} className={`form-control ${styles.field}`} ref="content" name="content" />
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

Edit.need = [params => {
  return fetchProduct(params.cuid);
}];

function mapStateToProps(state, props) {
  return {
    product: getProduct(state, props.match.params.cuid),
  };
}

Edit.propTypes = {
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
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Edit);
