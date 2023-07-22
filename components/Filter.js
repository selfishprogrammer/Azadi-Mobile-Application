/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Fonts from '../constants/Fonts';
import FastImage from 'react-native-fast-image';

export default function Filter({title, category, images, onClickFilter}) {
  return (
    <TouchableOpacity
      onPress={() => onClickFilter(category)}
      style={{
        borderRadius: 10,
        marginVertical: 15,
      }}>
      <View style={{marginHorizontal: 15}}>
        <FastImage
          source={images}
          style={{
            width: 60,
            height: 60,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text
          style={{
            fontFamily: Fonts.semiBold,
            color: 'black',
            fontSize: 12,
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
