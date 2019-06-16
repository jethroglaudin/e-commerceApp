import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getProducts } from "../../actions/productActions";
import { Link } from "react-router-dom";


class ShopIt extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentWillMount() {
    this.props.getProducts()
  }

  getAllProducts = () => {
    this.props.getProducts();
    console.log(this.props.product)

  }

  render() {
    const { user } = this.props.auth;
    const { products } = this.props.product;
    // const { errors } = this.props.errors;
    return (
      <div className="container">
      {/* <div className="Load" onLoad={this.getAllProducts()} /> */}
        <div class="row">
          <div class="col s12">
            <ul class="tabs">              
              <li class="tab col s3"><a href="#test4">Buy Product</a></li>
              <li class="tab col s3"><Link
          to="/Post">Sell Product</Link></li>
             <li class="tab col s3"><b>Hey there,</b> {user.name.split(" ")[0]}</li>
             <li onClick={this.onLogoutClick} class="tab col s3"><a href="#test3">Logout</a></li>
            </ul>
          </div>
        </div>
     
       
        {products.map(({ _id, productName, description, price }) => (
              <p>{productName}</p>  
             ))}
      

        
        

      </div>
    );
  }
}

ShopIt.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product
});

export default connect(
  mapStateToProps,
  { logoutUser, getProducts }
)(ShopIt);
