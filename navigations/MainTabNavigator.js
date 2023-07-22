/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ContactScreen from '../screens/ContactScreen/ContactScreen';
import SearchProduct from '../screens/SearchProduct/SearchProduct';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import {getCart, getLoggedIn, getUser, getWishList} from '../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from '../Redux/authSlice';
import SplashScreen from '../components/SplashScreen';
import {useIsFocused} from '@react-navigation/native';
import Fonts from '../constants/Fonts';
import ProductDetailsScreen from '../screens/ProductDetailsScreen/ProductDetailsScreen';
import {setCartItem, setWishList} from '../Redux/productSlice';
import CartDetailsScreen from '../screens/CartDetailsScreen/CartDetailsScreen';
import ShopsScreen from '../screens/ShopsScreen/ShopsScreen';
import {home, message, profile, shopsIcon} from '../constants/images';
import OTPScreen from '../screens/OTPScreen/OTPScreen';
import ShopDetailsSceen from '../screens/ShopsScreen/ShopDetailsSceen';
import FastImage from 'react-native-fast-image';
import CheckEmail from '../screens/ForgotPassord.js/CheckEmail';
import ResetPassword from '../screens/ForgotPassord.js/ResetPassword';
import CheckOutScreen from '../screens/CheckOutScreen/CheckOutScreen';
import PaymentGateWay from '../components/PaymentGateWay';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

const ContactStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="ContactScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="ContactScreen"
        component={ContactScreen}
      />
    </Stack.Navigator>
  );
};

const ShopsStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="ShopsScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="ShopsScreen"
        component={ShopsScreen}
      />
    </Stack.Navigator>
  );
};

// const SearchProductStack = () => {
//   return (
//     <Stack.Navigator
//       headerMode="none"
//       initialRouteName="SearchProductScreen"
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="SearchProductScreen"
//         component={SearchProduct}
//       />
//     </Stack.Navigator>
//   );
// };
const MyTabs = () => {
  const Bottom = createMaterialBottomTabNavigator();
  return (
    <Bottom.Navigator
      initialRouteName="HomeScreen"
      sceneAnimationEnabled={true}
      activeColor="black"
      //   inactiveColor="#fff"
      //   shifting={true}
      screenOptions={{
        headerShown: false,
      }}
      barStyle={{
        backgroundColor: '#fff',
        height: 75,
        elevation: 10,
      }}>
      <Bottom.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: <Text style={{fontFamily: Fonts.bold}}>Home</Text>,
          tabBarIcon: ({color}) => (
            <FastImage style={{height: 22, width: 22}} source={home} />
          ),
        }}
      />

      {/* <Bottom.Screen
        name="SearchProductScreen"
        component={SearchProductStack}
        options={{
          headerShown: true,
          tabBarLabel: <Text style={{fontFamily: Fonts.bold}}>Search</Text>,
          tabBarIcon: ({color}) => (
            <FastImage
              style={{height: 22, width: 22}}
              source={{
                uri: 'https://www.citypng.com/public/uploads/small/11640084021s7j4kii6hsgshmcxlovq7siag8vktv9rhqscjbbuyse2favmnjhrpjhrgqcug2nqdcpxsmovtjjonzon74knmk3kywi3tpxrpg8r.png',
              }}
            />
          ),
        }}
      /> */}
      <Bottom.Screen
        name="Shop"
        component={ShopsStack}
        options={{
          tabBarLabel: <Text style={{fontFamily: Fonts.bold}}>Shops</Text>,
          tabBarIcon: ({color}) => (
            <FastImage style={{height: 22, width: 22}} source={shopsIcon} />
          ),
        }}
      />

      <Bottom.Screen
        name="Contact"
        component={ContactStack}
        options={{
          tabBarLabel: <Text style={{fontFamily: Fonts.bold}}>Contact Us</Text>,
          tabBarIcon: ({color}) => (
            <FastImage style={{height: 22, width: 22}} source={message} />
          ),
        }}
      />
      <Bottom.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: <Text style={{fontFamily: Fonts.bold}}>Profile</Text>,
          tabBarIcon: ({color}) => (
            <FastImage style={{height: 22, width: 22}} source={profile} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

const nonLoginStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="myTab" component={MyTabs} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        options={{headerShown: false}}
        name="SearchProductScreen"
        component={SearchProduct}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CartDetailsScreen"
        component={CartDetailsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OTPScreen"
        component={OTPScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ShopDetailsSceen"
        component={ShopDetailsSceen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CheckEmail"
        component={CheckEmail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ResetPassword"
        component={ResetPassword}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CheckOutScreen"
        component={CheckOutScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PaymentGateWay"
        component={PaymentGateWay}
      />
    </Stack.Navigator>
  );
};

export default function MainTabNavigator() {
  const [checking, setchecking] = useState(true);
  const [userData, setuserData] = useState(null);
  const {isLogin} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    getUserDetails();
    getCartItem();
    if (isFocused) {
      getUserDetails();
    }
  }, [isFocused]);

  const getCartItem = async () => {
    const cart = await getCart();
    if (cart === null) {
      dispatch(setCartItem([]));
    } else {
      dispatch(setCartItem([...cart]));
    }

    const wishList = await getWishList();
    console.log(wishList, '=====');
    if (wishList === null) {
      dispatch(setWishList([]));
    } else {
      dispatch(setWishList(wishList));
    }
  };

  const getUserDetails = async () => {
    let userDetails = await getUser();
    let loggedIn = await getLoggedIn();

    if (loggedIn === 'true') {
      dispatch(setLogin(true));
    }
    console.log('usersss', loggedIn + '' + typeof loggedIn);
    setuserData(userDetails);
    setchecking(false);
  };
  if (checking) {
    return <SplashScreen />;
  }
  if (!isLogin) {
    return nonLoginStack();
  }
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="myTab" component={MyTabs} />
      <Stack.Screen
        options={{headerShown: false}}
        name="SearchProductScreen"
        component={SearchProduct}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CartDetailsScreen"
        component={CartDetailsScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ShopDetailsSceen"
        component={ShopDetailsSceen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CheckOutScreen"
        component={CheckOutScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PaymentGateWay"
        component={PaymentGateWay}
      />
    </Stack.Navigator>
  );
}
