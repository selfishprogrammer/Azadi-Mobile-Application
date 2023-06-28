/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import React from 'react';
import styles from './styles';
import Fonts from '../constants/Fonts';
import {SvgXml} from 'react-native-svg';
import {cartIcon} from '../constants/images';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
export default function Header() {
  const navigation = useNavigation();
  console.log('navigation', navigation.getState());
  console.log('navigation2', navigation.getParent());
  const {cartItem} = useSelector(state => state.product);
  const {address} = useSelector(state => state.address);

  const navState = navigation.getState();
  // const found = arr1.some(r => arr2.indexOf(r) >= 0);
  return (
    <View style={styles.headerContainer}>
      {Platform.OS === 'ios' &&
      !navState.routeNames.some(r =>
        ['HomeScreen', 'ProfileScreen', 'ContactScreen'].includes(r),
      ) ? (
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: 'https://icon-library.com/images/white-arrow-icon/white-arrow-icon-20.jpg',
            }}
            style={{width: 30, height: 30}}
          />
        </Pressable>
      ) : null}

      <View style={{width: '80%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: 'https://icon-library.com/images/location-icon-white-png/location-icon-white-png-12.jpg',
            }}
            style={{width: 30, height: 30}}
          />
          <Text style={{fontFamily: Fonts.bold, color: '#fff', fontSize: 10}}>
            {address?.display_name}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
            onPress={() => navigation.navigate('CartDetailsScreen')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* <Image
            source={{
              uri: 'https://png.pngtree.com/png-vector/20190320/ourmid/pngtree-vector-shopping-cart-icon-png-image_850694.jpg',
            }}
            style={{width: 30, height: 30}}
          /> */}
          <SvgXml xml={cartIcon} />
          <View style={{top: -14, right: 0}}>
            <Text style={{color: 'white', fontFamily: Fonts.bold}}>
              {cartItem.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
