/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {useState} from 'react';
import TextInputField from '../../components/TextInputField';
import {useNavigation} from '@react-navigation/native';
import Service from '../../services/services';
import ErrorToast from '../../components/ErrorToast';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../Redux/loaderSlice';

export default function CheckEmail() {
  const [email, setemail] = useState('');
  const [emailHasError, setemailHasError] = useState('');
  const [backendResponce, setbackendResponce] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const generateOTP = async () => {
    setbackendResponce('');
    var emailReg =
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (email.length <= 0) {
      setemailHasError('Field Cannot Be Empty!');
    } else if (!emailReg.test(email)) {
      setemailHasError('please enter a valid E-Mail ID');
    } else {
      dispatch(setLoading(true));
      const data = {email: email};
      const getOTP = await Service.generateOTPForgotPassword(data);
      if (getOTP && getOTP?.success) {
        navigation.navigate('ResetPassword', {
          from: 'forgotPassword',
          email: email,
        });
        setemail('');
      } else {
        setbackendResponce('Email not register , Please register ');
      }
      dispatch(setLoading(false));

      setemailHasError('');
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'green', justifyContent: 'center'}}>
      <ErrorToast errorTxt={backendResponce} />
      <View
        style={{
          margin: 20,
          marginTop: 10,
          padding: 5,
          paddingBottom: 10,
          shadowColor: Colors.toolTipColor,
          shadowOffset: {width: 0, height: 1},
          elevation: 8,
          paddingHorizontal: 25,
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontFamily: Fonts.bold,
            lineHeight: 20,
            color: 'black',
            marginTop: 15,
          }}>
          Enter you email
        </Text>
        <TextInputField
          label="Enter Email or Phone"
          hasError={false}
          errorMsg={emailHasError}
          onHandelchage={e => setemail(e)}
          value={email}
        />
        <TouchableOpacity
          onPress={generateOTP}
          style={{
            width: '100%',
            padding: 15,
            backgroundColor: 'green',
            borderRadius: 8,
            marginTop: 15,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontFamily: Fonts.bold,
              lineHeight: 20,
              color: 'white',
            }}>
            Send OTP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={{
            width: '100%',
            padding: 15,
            backgroundColor: 'transparent',
            borderColor: 'green',
            borderWidth: 2,
            borderRadius: 8,
            marginVertical: 15,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              fontFamily: Fonts.bold,
              lineHeight: 20,
              color: 'black',
            }}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
