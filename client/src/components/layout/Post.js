import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct } from "../../actions/productActions";
import classnames from "classnames";

class Post extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            phoneNumber: "",
            productName: "",
            price: "",
            description: "",
            errors: {}

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const newProduct = {
            name: this.state.name,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            productName: this.state.productName,
            price: this.state.price,
            description: this.state.description,

        };
        this.props.addProduct(newProduct, this.props.history);
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <Link
                            to="/ShopIt" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                            Return back to ShopIt home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>List Product</b> below
                            </h4>

                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        isvalid: errors.name
                                    })}
                                />
                                <label htmlFor="name">Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="text"
                                    className={classnames("", {
                                        isvalid: errors.email
                                    })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.phoneNumber}
                                    error={errors.phoneNumber}
                                    id="phoneNumber"
                                    type="text"
                                    className={classnames("", {
                                        isvalid: errors.phoneNumber
                                    })}
                                />
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <span className="red-text">{errors.phoneNumber}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.productName}
                                    error={errors.productName}
                                    id="productName"
                                    type="text"
                                    className={classnames("", {
                                        isvalid: errors.productName
                                    })}
                                />
                                <label htmlFor="productName">Name of Product</label>
                                <span className="red-text">{errors.productName}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.price}
                                    error={errors.price}
                                    id="price"
                                    type="text"
                                    className={classnames("", {
                                        isvalid: errors.price
                                    })}
                                />
                                <label htmlFor="price">Price</label>
                                <span className="red-text">{errors.price}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.description}
                                    error={errors.description}
                                    id="description"
                                    type="text"
                                    className={classnames("", {
                                        isvalid: errors.description
                                    })}
                                />
                                <label htmlFor="description">Description</label>
                                <span className="red-text">{errors.description}</span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    List Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }


}
Post.propTypes = {
    addProduct: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
    // auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    product: state.product,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addProduct }
)(withRouter(Post));