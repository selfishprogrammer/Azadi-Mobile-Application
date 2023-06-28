/* eslint-disable react-native/no-inline-styles */
import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default function Loading({text, spin}) {
  if (spin) {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 999999,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator size={60} color={'green'} />
        {text !== '' ? (
          <Text
            style={{
              marginVertical: 20,
              color: 'black',
              fontFamily: Fonts.bold,
            }}>
            {text}
          </Text>
        ) : null}
      </View>
    );
  }
  return null;
}
