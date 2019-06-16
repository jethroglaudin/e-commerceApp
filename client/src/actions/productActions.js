import axios from "axios";
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCTS,
  PRODUCTS_LOADING,
  GET_ERRORS
} from "./types";

export const getProducts = () => dispatch => {
  // dispatch(setProductsLoading());
  axios.get("/api/products").then(res =>
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    })
  );
};

export const addProduct = product => dispatch => {
  axios.post("/api/products/", product).then(res =>
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
};

export const deleteProduct = (id) => dispatch => {
    axios.delete(`/api/product/${id}`).then(res =>
        dispatch({
            type: DELETE_PRODUCTS,
            payload: id
        }))
};

export const setProductsLoading = () => {
    return {
        type: PRODUCTS_LOADING
    }
}