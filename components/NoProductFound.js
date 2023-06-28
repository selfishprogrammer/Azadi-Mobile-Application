/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Fonts from '../constants/Fonts';

export default function NoProductFound() {
  return (
    <View style={{marginVertical: 30}}>
      <Text
        style={{
          fontSize: 18,
          fontFamily: Fonts.bold,
          alignSelf: 'center',
          marginTop: 10,
        }}>
        Oops, No Product Found
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: Fonts.semiBold,
          alignSelf: 'center',
          marginTop: 10,
        }}>
        We are working on it, soon it will be available.
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: Fonts.bold,
          alignSelf: 'center',
          marginTop: 10,
        }}>
        Thankyou for using AZADI
      </Text>
    </View>
  );
}
