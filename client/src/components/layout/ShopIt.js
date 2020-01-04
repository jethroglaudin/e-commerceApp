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

  componentDidMount() {
    this.props.getProducts();
  }

  getAllProducts = () => {
    this.props.getProducts();
    console.log(this.props.product);
  };

  render() {
    const { user } = this.props.auth;
    const { products } = this.props.product;
    // const { errors } = this.props.errors;
    return (
      <div className="row">
        <div className="col s12 m2">
          <div className="card">
            <div className="card-image">
              <Link to href="#">
                <img  
                  src="https://place-hold.it/100x100"
                  alt=""
                />
              </Link>
            </div>

            <div className="card-content">
              <h4 className="card-title">
                <Link to="#">Item One</Link>
              </h4>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, { logoutUser, getProducts })(ShopIt);
