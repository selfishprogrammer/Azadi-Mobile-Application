import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    cartItem: [],
    allProductList: [],
    allBusiness: [],
  },
  reducers: {
    setCartItem: (state, action) => {
      state.cartItem = action.payload;
    },
    setallProductList: (state, action) => {
      state.allProductList = action.payload;
    },
    setallBusiness: (state, action) => {
      state.allBusiness = action.payload;
    },
  },
});
export const {setCartItem, setallProductList, setallBusiness} =
  productSlice.actions;
export default productSlice.reducer;
