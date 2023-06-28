/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import Fonts from '../constants/Fonts';
import ErrorText from './ErrorText';

export default function TextInputField({
  label,
  value,
  onChangeText,
  errorMsg,
  hasError,
  type,
  onHandelchage,
  fieldType,
  height,
  multiline,
}) {
  return (
    <>
      <TextInput
        theme={{
          colors: {
            primary: 'green',
            text: 'green',
          },
          fonts: {
            regular: {
              fontFamily: Fonts.bold,
            },
          },
        }}
        //   value={houseDetails}
        //   onChangeText={val => sethouseDetails(val)}
        label={label}
        maxLength={fieldType === 'otp' ? 6 : 10000}
        selectionColor="green"
        mode="outlined"
        outlineColor="green"
        keyboardType={type}
        style={{
          marginTop: 15,
          //   marginBottom: 15,
          height: height ? height : 0,
          backgroundColor: '#fff',
          fontFamily: Fonts.bold,
          color: 'green',
          fontWeight: fieldType === 'otp' ? 'bold' : 'normal',
        }}
        multiline={multiline}
        value={value}
        onChangeText={onHandelchage}
      />
      <ErrorText errorMsg={errorMsg} hasError={hasError} />
    </>
  );
}
