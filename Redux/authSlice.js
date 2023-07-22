import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    userData: {},
    deviceID: '',
    appVersion: '',
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setDeviceID: (state, action) => {
      state.deviceID = action.payload;
    },
    setAppVersion: (state, action) => {
      state.appVersion = action.payload;
    },
  },
});
export const {setLogin, setUserData, setDeviceID, setAppVersion} =
  authSlice.actions;
export default authSlice.reducer;
