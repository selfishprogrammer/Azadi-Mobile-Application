/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Fonts from '../constants/Fonts';

export default function ErrorToast({errorTxt, backendColor}) {
  if (errorTxt === '') {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        zIndex: 99999,
        top: 0,
        alignSelf: 'center',
        width: '90%',
        padding: 15,
        backgroundColor: backendColor ? backendColor : 'red',
        borderRadius: 8,
        marginTop: 40,
      }}>
      <Text style={{color: 'white', fontFamily: Fonts.bold}}>{errorTxt}</Text>
    </View>
  );
}
