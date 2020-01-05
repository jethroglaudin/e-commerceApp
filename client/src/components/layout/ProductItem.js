// import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";


// class ProductItem extends Component {
//     render(){
//         const { auth, products } = this.props;

//         return(
//            <div className="row">
//         <div className="col s12 m6">
//           <div className="card">
//             <div className="card-image">
//               <Link to href="#">
//                 <img  
//                   src="https://place-hold.it/100x100"
//                   alt=""
//                 />
//               </Link>
//               <h4 className="card-title">
             
//               </h4>
//             </div>

//             <div className="card-content">
//             </div>
//           </div>
//         </div>
      
//       </div>
//         )

//     }


// }

// ProductItem.propTypes = {
//     auth: PropTypes.object.isRequired,
//     product: PropTypes.object.isRequired
//   };
  
//   const mapStateToProps = state => ({
//     auth: state.auth
//   });
  
//   export default connect(
//     mapStateToProps,
//     {  }
//   )(ProductItem);