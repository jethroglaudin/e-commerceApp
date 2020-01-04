import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShopIt from './ShopIt';

class ProductFeed extends Component {
render(){
    const { product } = this.props;
    return product.map(item => <ShopIt key={item._id} product={item} />)
}

}

ProductFeed.propTypes = {
    products: PropTypes.array.isRequired
}

export default ProductFeed;