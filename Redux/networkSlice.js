import {createSlice} from '@reduxjs/toolkit';

const networkSlice = createSlice({
  name: 'network',
  initialState: {
    isConnected: false,
    refScreen: {},
  },
  reducers: {
    setConnectionss: (state, action) => {
      state.isConnected = action.payload;
    },
    setRefScreen: (state, action) => {
      state.refScreen = action.payload;
    },
  },
});
export const {setConnectionss, setRefScreen} = networkSlice.actions;
export default networkSlice.reducer;
