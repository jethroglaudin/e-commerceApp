import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authenticatedNav = (
      <nav className="navbar-fixed">
        <div className="z-depth-1">
          <li className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">shop</i>
              Shop-It
            </Link>
            <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s3">
                  <Link to="#">Buy Products</Link>
                </li>
                <li className="tab col s3">
                  <Link to="/Post">List Product</Link>
                </li>
                <li className="tab col s2" style={{color: "black"}}>
                  <b>Hello,</b> {user.name.split(" ")[0]}
                </li>
                <li onClick={this.onLogoutClick} class="tab col s3">
                  <a href="#test3">Logout</a>
                </li>
              </ul>
            </div>
          </div>
          </li>
          

          
        </div>
      </nav>
    );

    const unAuthenticatedNav = (
       <div className="navbar-fixed">
        <nav className="z-depth-3">
          <li className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">shop</i>
              Shop-It
            </Link>
          </li>
          </nav>   
      </div>
    );

    return (
      <div className="">
        {isAuthenticated ? authenticatedNav : unAuthenticatedNav}
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
