/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import FastImage from 'react-native-fast-image';

export default function HomeSlider({url}) {
  return (
    <FastImage
      source={{uri: url}}
      style={{
        width: 400,
        height: 180,
        marginHorizontal: 0,
        // resizeMode: 'contain',
      }}
      resizeMode={FastImage.resizeMode.stretch}
    />
  );
}
