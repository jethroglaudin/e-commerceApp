import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";


class ProductFeed extends Component {
  render() {
    const { item } = this.props;
    return item.map(product => (
      <ProductItem key={product._id} item={product} />
    ));
  }
}

ProductFeed.propTypes = {
  item: PropTypes.array.isRequired
};

export default ProductFeed;
