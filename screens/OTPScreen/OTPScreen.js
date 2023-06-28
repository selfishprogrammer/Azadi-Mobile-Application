/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import TextInputField from '../../components/TextInputField';
import {useState} from 'react';
import Service from '../../services/services';
import {useDispatch} from 'react-redux';
import {setLogin, setUserData} from '../../Redux/authSlice';
import {setLoggedIn, setUser} from '../../services/auth';
import {useEffect} from 'react';
import ErrorToast from '../../components/ErrorToast';
import {setLoading} from '../../Redux/loaderSlice';

export default function OTPScreen(props) {
  const {email, from} = props.route.params;
  const [otp, setotp] = useState('');
  const [otpHasError, setotpHasError] = useState('');
  const [resendBtnVisible, setresendBtnVisible] = useState(true);
  const [backendResponse, setbackendResponse] = useState('');
  const [backendResponseColor, setbackendResponseColor] = useState('red');

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setresendBtnVisible(false);
    }, 90000);
  }, []);

  const resendOTP = async () => {
    resetState();
    setresendBtnVisible(true);
    dispatch(setLoading(true));
    const getOtp = await Service.getOTP({
      email: email,
    });
    if (getOtp && getOtp?.success) {
      setbackendResponse('OTP sent successfully');
      setbackendResponseColor('green');
    }
    dispatch(setLoading(false));
  };

  const resetState = () => {
    setotp('');
    setbackendResponse('');
    setbackendResponseColor('');
    setotpHasError('');
  };

  const verifyOTP = async () => {
    resetState();
    if (otp.length < 6) {
      setotpHasError('OTP length must be 6');
    } else {
      const data = {
        email: email,
        otp: otp,
      };
      dispatch(setLoading(true));
      const verifyOTPRes = await Service.verifyOTP(data);
      if (verifyOTPRes && verifyOTPRes?.success) {
        dispatch(setLogin(true));
        dispatch(setUserData(verifyOTPRes.resultObj));
        await setLoggedIn('true');
        await setUser(verifyOTPRes.resultObj);
      } else {
        setbackendResponse('Wrong OTP Try again Or Resend!');
        setbackendResponseColor('red');
      }
      dispatch(setLoading(false));
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ErrorToast
        errorTxt={backendResponse}
        backendColor={backendResponseColor}
      />
      <View
        style={{
          margin: 20,
          marginTop: 10,
          width: '90%',
          padding: 5,
          paddingBottom: 10,
          shadowColor: Colors.toolTipColor,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.5,
          elevation: 8,
          paddingHorizontal: 25,
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <Text style={{fontFamily: Fonts.regular}}>
          Verfy OTP sent to{' '}
          <Text style={{fontFamily: Fonts.bold, color: 'green'}}>{email}</Text>
        </Text>
        <TextInputField
          label="OTP"
          hasError={false}
          type={'numeric'}
          fieldType="otp"
          errorMsg={otpHasError}
          onHandelchage={e => setotp(e)}
          value={otp}
        />
        <TouchableOpacity
          onPress={verifyOTP}
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
            Verify OTP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={resendBtnVisible}
          onPress={resendOTP}
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
            Resend OTP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
