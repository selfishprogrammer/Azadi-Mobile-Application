/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ContactScreen from '../screens/ContactScreen/ContactScreen';
import SearchProduct from '../screens/SearchProduct/SearchProduct';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import {getCart, getLoggedIn, getUser} from '../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from '../Redux/authSlice';
import SplashScreen from '../components/SplashScreen';
import {useIsFocused} from '@react-navigation/native';
import Fonts from '../constants/Fonts';
import ProductDetailsScreen from '../screens/ProductDetailsScreen/ProductDetailsScreen';
import {setCartItem} from '../Redux/productSlice';
import CartDetailsScreen from '../screens/CartDetailsScreen/CartDetailsScreen';
import ShopsScreen from '../screens/ShopsScreen/ShopsScreen';
import {shopsIcon} from '../constants/images';
import OTPScreen from '../screens/OTPScreen/OTPScreen';
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
            <Image
              style={{height: 22, width: 22}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
              }}
            />
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
            <Image
              style={{height: 22, width: 22}}
              source={{
                uri: 'https://www.citypng.com/public/uploads/small/11640084021s7j4kii6hsgshmcxlovq7siag8vktv9rhqscjbbuyse2favmnjhrpjhrgqcug2nqdcpxsmovtjjonzon74knmk3kywi3tpxrpg8r.png',
              }}
            />
          ),
        }}
      /> */}
      <Bottom.Screen
        name="shops"
        component={ShopsStack}
        options={{
          tabBarLabel: <Text style={{fontFamily: Fonts.bold}}>Shops</Text>,
          tabBarIcon: ({color}) => (
            <Image style={{height: 22, width: 22}} source={shopsIcon} />
          ),
        }}
      />

      <Bottom.Screen
        name="contact"
        component={ContactStack}
        options={{
          tabBarLabel: <Text style={{fontFamily: Fonts.bold}}>Contact Us</Text>,
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 22, width: 22}}
              source={{
                uri: 'https://pixlok.com/wp-content/uploads/2021/07/Message-Free-Icon-fidswo.png',
              }}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: <Text style={{fontFamily: Fonts.bold}}>Profile</Text>,
          tabBarIcon: ({color}) => (
            <Image
              style={{height: 22, width: 22}}
              source={{
                uri: 'https://icon-library.com/images/profile-png-icon/profile-png-icon-2.jpg',
              }}
            />
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
    </Stack.Navigator>
  );
};

export default function MainTabNavigator() {
  const [checking, setchecking] = useState(true);
  const [userData, setuserData] = useState(null);
  const {isLogin} = useSelector(state => state.auth);
  const {cartItem} = useSelector(state => state.product);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    getUserDetails();
    getCartItem();
    if (isFocused) {
      getUserDetails();
    }
  }, [isFocused, getUserDetails]);

  const getCartItem = async () => {
    const cart = await getCart();
    console.log('cartttt', cart);
    if (cart === null) {
      dispatch(setCartItem([]));
    } else {
      dispatch(setCartItem([...cart]));
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
    </Stack.Navigator>
  );
}
