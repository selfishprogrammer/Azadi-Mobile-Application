/* eslint-disable react-native/no-inline-styles */
import {Image} from 'react-native';
import React from 'react';

export default function HomeSlider({url}) {
  return (
    <Image
      source={{uri: url}}
      style={{
        width: 420,
        height: 180,
        resizeMode: 'stretch',
        marginHorizontal: 0,
      }}
    />
  );
}
