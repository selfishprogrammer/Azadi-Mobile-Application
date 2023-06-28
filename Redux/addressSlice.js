import {createSlice} from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    address: {
      display_name: 'Fetching your location',
      lat: '22.577242',
      long: '88.376079',
    },
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});
export const {setAddress} = addressSlice.actions;
export default addressSlice.reducer;
