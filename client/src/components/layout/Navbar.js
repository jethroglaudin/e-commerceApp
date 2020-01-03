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
        const { isAuthenticated } = this.props.auth;

        const authenticatedNav = (
            <ul className="navbar-fixed">
                <nav className="z-depth-0">
                    <li className="nav-item">
                        <Link className="nav-link">
                        Buy Product
                        </Link>
                    </li>
                    <div className="nav-wrapper white">

                    </div>
                </nav>
            </ul>
        )
        return (
            <div className="navbar-fixed">
                <nav className="z-depth-0">
                    <div className="nav-wrapper white">
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
                    </div>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps, { logoutUser }
)(Navbar);