import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Page extends Component {
  static propTypes = {
    pageText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    pageNumber: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
    activeClass: PropTypes.string,
    disabledClass: PropTypes.string,
  }

  static defaultProps = {
    activeClass: 'active',
    disabledClass: 'disabled',
    isActive: false,
    isDisabled: false,
  }

  handleClick(e) {
    e.preventDefault();
    const { isDisabled, pageNumber } = this.props;

    if (isDisabled) {
      return;
    }
    this.props.onClick(pageNumber);
  }

  render() {
    const {
      pageText,
      activeClass,
      disabledClass,
      isActive,
      isDisabled,
    } = this.props;

    const css = `${cx({
      [activeClass]: isActive,
      [disabledClass]: isDisabled,
    })} page-item`;

    return (
            <li className={css} onClick={::this.handleClick}>
                <a className="page-link" href="#">
                    {pageText}
                </a>
            </li>
    );
  }
}
