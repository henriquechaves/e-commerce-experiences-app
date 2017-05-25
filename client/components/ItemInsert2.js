import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../assets/css/insert.css';

export class Insert extends Component {
  addPost = () => {

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

      this.props.addPost(newProduct);

      titleRef.value = priceRef.value= descRef.value = contentRef.value
      = estoqueRef.value = pesoRef.value = volumeRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddProduct ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles.insertWrapper}>

          <input placeholder="Product Name" className={styles.formField} ref="name" />
          <input placeholder="Product Title" className={styles.formField} ref="title" />
          <input placeholder="Product Stock" className={styles.formField} ref="estoque" />
          <input placeholder="Product Price" className={styles.formField} ref="price" />
          <input placeholder="Product Weight" className={styles.formField} ref="peso" />
          <textarea placeholder="Product Description" className={styles.formField} ref="description" />
          <textarea placeholder="Product Content" className={styles.formField} ref="content" />

          <a className={styles['post-submit-button']} href="#" onClick={this.addPost}>
            Submit
          </a>
        </div>
      </div>
    );
  }
}

Insert.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default Insert;
