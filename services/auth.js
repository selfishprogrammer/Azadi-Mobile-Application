import AsyncStorage from '@react-native-async-storage/async-storage';

const setUser = async data => {
  await AsyncStorage.setItem('users', JSON.stringify(data));
};
const getUser = async () => {
  const data = await AsyncStorage.getItem('users');
  if (!data) {
    return null;
  }
  return data;
};
const setLoggedIn = async data => {
  await AsyncStorage.setItem('loggedIn', data);
};
const getLoggedIn = async () => {
  let data = await AsyncStorage.getItem('loggedIn');
  return data;
};

const setCart = async data => {
  await AsyncStorage.setItem('cart', JSON.stringify(data));
};
const getCart = async () => {
  const data = await AsyncStorage.getItem('cart');
  if (!data) {
    return [];
  }
  return JSON.parse(data);
};

const setWishLists = async data => {
  await AsyncStorage.setItem('wishlist', JSON.stringify(data));
};
const getWishList = async () => {
  const data = await AsyncStorage.getItem('wishlist');
  if (!data) {
    return [];
  }
  return JSON.parse(data);
};
const setTCVersion = async data => {
  await AsyncStorage.setItem('tc', JSON.stringify(data));
};
const getTCVersion = async () => {
  const data = await AsyncStorage.getItem('tc');
  if (!data) {
    return null;
  }
  return data;
};
export {
  setUser,
  getUser,
  setLoggedIn,
  getLoggedIn,
  setCart,
  getCart,
  setTCVersion,
  getTCVersion,
  setWishLists,
  getWishList,
};
