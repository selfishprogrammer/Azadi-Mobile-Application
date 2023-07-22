/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from './Header';
import Fonts from '../constants/Fonts';

export default function PaymentGateWay() {
  return (
    <>
      <Header />
      <View
        style={{
          flex: 1,
          alignSelf: 'center',
          justifyContent: 'center',
          width: '80%',
        }}>
        <Text
          style={{
            marginVertical: 20,
            fontFamily: Fonts.bold,
            fontSize: 18,
            textAlign: 'center',
          }}>
          We are working on it will be coming soon 😀
        </Text>
      </View>
    </>
  );
}
