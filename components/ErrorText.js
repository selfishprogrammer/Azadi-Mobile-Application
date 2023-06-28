/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';

export default function ErrorText({errorMsg}) {
  return (
    <View>
      {errorMsg === '' ? null : (
        <Text className="mx-2" style={{color: 'red'}}>
          {errorMsg}
        </Text>
      )}
    </View>
  );
}
