/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import TextInputField from '../../components/TextInputField';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import Service from '../../services/services';
import {useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setLoading} from '../../Redux/loaderSlice';
import ErrorToast from '../../components/ErrorToast';
import TermsAndConditions from '../../components/TermsAndConditions';
import ErrorText from '../../components/ErrorText';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setname] = useState('');
  const [nameHasError, setnameHasError] = useState('');
  const [email, setemail] = useState('');
  const [emailHasError, setemailHasError] = useState('');
  const [phone, setphone] = useState('');
  const [phoneHasError, setphoneHasError] = useState('');
  const [password, setpassword] = useState('');
  const [passwordHasError, setpasswordHasError] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [cpasswordHasError, setcpasswordHasError] = useState('');
  const [backendResponce, setbackendResponce] = useState('');
  const [tcVal, settcVal] = useState(false);
  const [tcValError, settcValError] = useState('');
  const dispatch = useDispatch();
  const register = async () => {
    resetErrorField();
    console.log(name, email, phone, password, cpassword);
    var emailReg =
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}/g;
    console.log(name, email, phone, password, cpassword);
    if (name.length <= 0) {
      setnameHasError('Field Cannot Be Empty!');
    }
    if (email.length <= 0) {
      setemailHasError('Field Cannot Be Empty!');
    }
    if (phone.length <= 0) {
      setphoneHasError('Please enter your phone number');
    }
    if (password.length <= 0) {
      setpasswordHasError('Enter a password');
    }
    if (cpassword.length <= 0) {
      setcpasswordHasError('Enter a password');
    } else {
      if (name.length <= 6 || name.length >= 15) {
        setnameHasError('Length Of Name Should Between 6 to 15 Character!');
      } else if (!emailReg.test(email)) {
        setemailHasError('please enter a valid E-Mail ID');
      } else if (phone.length < 10 || phone.length > 10) {
        setphoneHasError('please enter a valid phone numbe');
      } else if (!passwordReg.test(password)) {
        setpasswordHasError(
          'Pasword Should Be 8 Digit one Special Character one Capital  and one Small Letter Must Present',
        );
      } else if (password !== cpassword) {
        setcpasswordHasError("Password doesn't match, please try again");
      } else if (!tcVal) {
        settcValError('Please Accept Terms & Conditions');
      } else {
        dispatch(setLoading(true));
        const registerData = await Service.userRegister({
          name: name,
          email: email,
          mobile: phone,
          password: password,
        });
        // console.log('registerData', registerData);
        if (
          registerData &&
          registerData.errorObj &&
          !registerData.errorObj?.isVerified &&
          registerData.errorObj?.email === email
        ) {
          const getOtp = await Service.getOTP({
            email: registerData.errorObj?.email,
          });
          if (getOtp && getOtp?.success) {
            navigation.navigate('OTPScreen', {
              from: 'register',
              email: registerData.errorObj?.email,
            });
            setbackendResponce('');
          } else {
            setbackendResponce(
              'Something went wrong ! Please Login and Verify Your OTP',
            );
          }
        } else {
          setbackendResponce('Email or password already exists..');
        }
        dispatch(setLoading(false));
      }
    }
  };

  const resetErrorField = () => {
    setnameHasError('');
    setemailHasError('');
    setphoneHasError('');
    setpasswordHasError('');
    setcpasswordHasError('');
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
            label="Enter Name"
            hasError={false}
            errorMsg={nameHasError}
            onHandelchage={e => setname(e)}
            value={name}
          />
          <TextInputField
            label="Enter Email"
            hasError={false}
            errorMsg={emailHasError}
            onHandelchage={e => setemail(e)}
            value={email}
          />
          <TextInputField
            label="Enter Phone"
            hasError={false}
            errorMsg={phoneHasError}
            onHandelchage={e => setphone(e)}
            value={phone}
            type="numeric"
          />
          <TextInputField
            label="Enter Password"
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
          <TermsAndConditions tcAccepted={e => settcVal(e)} />
          <ErrorText errorMsg={tcValError} />
          <TouchableOpacity
            onPress={register}
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
              Signup
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
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
