/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React from 'react';

export default function HomeSlider({url}) {
  return (
    <Image
      source={{uri: url}}
      style={{
        width: 373,
        height: 150,
        resizeMode: 'stretch',
        marginHorizontal: 10,
      }}
    />
  );
}
