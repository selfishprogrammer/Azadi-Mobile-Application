/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setLogin} from '../Redux/authSlice';
import {setUser} from '../services/auth';

export default function NonLoggedInProfile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          width: '80%',
          fontFamily: Fonts.bold,
          color: Colors.toolTipColor,
        }}>
        Login or signup for an account to view your personalized profile page.
      </Text>
      <TouchableOpacity
        onPress={async () => {
          dispatch(setLogin(false));
          await setUser(null);
          navigation.navigate('LoginScreen');
        }}
        style={{
          width: '80%',
          backgroundColor: 'green',
          paddingVertical: 10,
          marginVertical: 20,
          borderRadius: 8,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 15,
            fontFamily: Fonts.bold,
            lineHeight: 20,
            color: 'white',
          }}>
          Login / Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
}
