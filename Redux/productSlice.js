import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    cartItem: [],
    allProductList: [],
    allBusiness: [],
    wishList: [],
    buyNow: [],
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
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    setBuyNow: (state, action) => {
      state.buyNow = action.payload;
    },
  },
});
export const {
  setCartItem,
  setallProductList,
  setallBusiness,
  setWishList,
  setBuyNow,
} = productSlice.actions;
export default productSlice.reducer;
