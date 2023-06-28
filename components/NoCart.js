/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from './Header';
import Fonts from '../constants/Fonts';
import {useNavigation} from '@react-navigation/native';

export default function NoCart() {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{
            uri: 'https://icon-library.com/images/shopping-cart-icon-png-transparent/shopping-cart-icon-png-transparent-13.jpg',
          }}
          style={{width: 150, height: 150}}
        />
        <Text
          style={{marginVertical: 20, fontFamily: Fonts.bold, fontSize: 18}}>
          Nothing in Cart
        </Text>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate('HomeScreen');
          }}
          style={{
            width: '80%',
            backgroundColor: 'green',
            paddingVertical: 10,
            marginVertical: 20,
            borderRadius: 8,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontFamily: Fonts.bold,
              lineHeight: 20,
              color: 'white',
            }}>
            Continue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
