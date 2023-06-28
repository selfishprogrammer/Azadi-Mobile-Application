import {combineReducers} from '@reduxjs/toolkit';
import auth from '../Redux/authSlice';
import loading from '../Redux/loaderSlice';
import product from '../Redux/productSlice';
import address from '../Redux/addressSlice';

export default combineReducers({
  auth,
  loading,
  product,
  address,
});
