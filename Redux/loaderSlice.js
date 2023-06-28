import {createSlice} from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
    loadingText: '',
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLoadingText: (state, action) => {
      state.loadingText = action.payload;
    },
  },
});
export const {setLoading, setLoadingText} = loaderSlice.actions;
export default loaderSlice.reducer;
