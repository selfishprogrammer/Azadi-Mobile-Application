/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

export default function Line() {
  return (
    <View
      style={{
        borderWidth: 0.3,
        width: '100%',
        borderColor: Colors.modalShadowColor,
        alignSelf: 'center',
      }}
    />
  );
}
