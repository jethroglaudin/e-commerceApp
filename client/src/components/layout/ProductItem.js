import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  render() {
    const { auth, item } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col s4 card-container">
            <div className="card medium">
              <div className="card-image small">
                <Link to href="#">
                  <img src="https://place-hold.it/90x90" alt="" />
                </Link>
              </div>
              <span className="card-title">{item.productName}</span>

              <div className="card-content">
                <h5>${item.price}</h5>
                <p>{item.description}</p>
              </div>
              <div className="card-action">
                <button type="submit" className="btn btn-dark">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  auth: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  item: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(ProductItem);
