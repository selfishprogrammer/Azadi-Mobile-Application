/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import ErrorToast from '../../components/ErrorToast';
import TextInputField from '../../components/TextInputField';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import Service from '../../services/services';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../Redux/loaderSlice';

export default function ResetPassword(props) {
  const [password, setpassword] = useState('');
  const [passwordHasError, setpasswordHasError] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [cpasswordHasError, setcpasswordHasError] = useState('');
  const [backendResponce, setbackendResponce] = useState('');
  const [emailSent, setemailSent] = useState(false);
  const [otp, setotp] = useState('');
  const [otpHasError, setotpHasError] = useState('');

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const {email} = props.route.params;

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        setemailSent(false);
      }, 3000);
      setemailSent(true);
    }
  }, [isFocused]);

  const resetPassword = async () => {
    setbackendResponce('');
    setpasswordHasError('');
    setcpasswordHasError('');
    setotpHasError('');
    var passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}/g;
    if (password.length <= 0) {
      setpasswordHasError('Enter a password');
    }
    if (cpassword.length <= 0) {
      setcpasswordHasError('Enter a confirm password');
    }
    if (otp.length <= 0) {
      setotpHasError(`Enter a OTP sent to ${email}`);
    } else {
      if (!passwordReg.test(password)) {
        setpasswordHasError(
          'Pasword Should Be 8 Digit one Special Character one Capital  and one Small Letter Must Present',
        );
      } else if (password !== cpassword) {
        setcpasswordHasError("Password doesn't match, please try again");
      } else if (otp.length < 6) {
        setotpHasError('OTP must be 6 digit');
      } else {
        dispatch(setLoading(true));
        const data = {
          otp: otp,
          email: email,
          newPassword: password,
        };
        const updatePass = await Service.paswordUpdate(data);
        if (updatePass && updatePass.success) {
          setotp('');
          setpassword('');
          setcpassword('');
          Alert.alert(
            'Password Updated!',
            'Password updated successful , Login with your new password',
            [
              {
                text: 'Back to Login',
                onPress: () => {
                  navigation.navigate('LoginScreen');
                },
              },
            ],
          );
        } else {
          setbackendResponce('Invalid OTP');
        }
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
      }}>
      <KeyboardAwareScrollView>
        <ErrorToast errorTxt={backendResponce} />

        <ErrorToast
          errorTxt={emailSent ? `OTP sent to ${email}` : ''}
          backendColor="yellowgreen"
        />

        <View
          style={{
            margin: 20,
            marginTop: 110,
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
            Register with Azadi
          </Text>
          <TextInputField
            label="Enter New Password"
            hasError={false}
            errorMsg={passwordHasError}
            onHandelchage={e => setpassword(e)}
            value={password}
          />
          <TextInputField
            label="Enter Confirm Password"
            hasError={false}
            errorMsg={cpasswordHasError}
            onHandelchage={e => setcpassword(e)}
            value={cpassword}
          />
          <TextInputField
            label="Enter 6 Digit OTP"
            hasError={false}
            errorMsg={otpHasError}
            onHandelchage={e => setotp(e)}
            value={otp}
            fieldType="otp"
            type={'numeric'}
          />
          <TouchableOpacity
            onPress={resetPassword}
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
              Reset your password
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
      </KeyboardAwareScrollView>
    </View>
  );
}
