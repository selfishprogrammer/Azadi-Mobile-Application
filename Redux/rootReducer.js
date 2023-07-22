import {combineReducers} from '@reduxjs/toolkit';
import auth from '../Redux/authSlice';
import loading from '../Redux/loaderSlice';
import product from '../Redux/productSlice';
import address from '../Redux/addressSlice';
import network from '../Redux/networkSlice';

export default combineReducers({
  auth,
  loading,
  product,
  address,
  network,
});
