/* eslint-disable react-native/no-inline-styles */
import {View, Image} from 'react-native';
import React from 'react';
import {azadiLogo} from '../constants/images';

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Image
        source={azadiLogo}
        style={{width: 90, height: 90, resizeMode: 'contain', borderRadius: 20}}
      />
    </View>
  );
}
