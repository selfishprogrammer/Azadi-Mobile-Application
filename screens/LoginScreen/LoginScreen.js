/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import TextInputField from '../../components/TextInputField';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import Service from '../../services/services';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin, setUserData} from '../../Redux/authSlice';
import {setLoggedIn, setUser} from '../../services/auth';
import {setLoading} from '../../Redux/loaderSlice';
import ErrorToast from '../../components/ErrorToast';

export default function LoginScreen() {
  const [username, setusername] = useState('');
  const [usernameHasError, setusernameHasError] = useState('');
  const [password, setpassword] = useState('');
  const [passwordHasError, setpasswordHasError] = useState('');
  const [backendResponce, setbackendResponce] = useState('');
  const {isLoading} = useSelector(state => state.loading);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const resetInputField = () => {
    setusername('');
    setpassword('');
  };

  const resetErrorField = () => {
    setusernameHasError('');
    setpasswordHasError('');
    setbackendResponce('');
  };
  console.log('loading', isLoading);

  const login = async () => {
    resetErrorField();

    if (username.length <= 0) {
      setusernameHasError('Field Cannot Be Empty!');
    }
    if (password.length <= 0) {
      setpasswordHasError('Enter a password');
    } else {
      dispatch(setLoading(true));
      const loginData = await Service.userLogin({
        username: username,
        password: password,
      });
      if (loginData && loginData.success) {
        dispatch(setLogin(true));
        dispatch(setUserData(loginData.resultObj));
        await setUser(loginData.resultObj);
        await setLoggedIn('true');
        setbackendResponce('');
        resetInputField();
      } else {
        setbackendResponce('Email or password incorrect...');
      }
      dispatch(setLoading(false));
    }
  };
  return (
    <View
      style={{flex: 1, backgroundColor: '#F5F5F5', justifyContent: 'center'}}>
      <ErrorToast errorTxt={backendResponce} />
      <View
        style={{
          margin: 20,
          marginTop: 10,
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
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontFamily: Fonts.bold,
            lineHeight: 20,
            color: 'black',
            marginTop: 15,
          }}>
          Login with Azadi
        </Text>
        <TextInputField
          label="Enter Email or Phone"
          hasError={false}
          errorMsg={usernameHasError}
          onHandelchage={e => setusername(e)}
          value={username}
        />
        <TextInputField
          label="Enter Password"
          hasError={false}
          errorMsg={passwordHasError}
          onHandelchage={e => setpassword(e)}
          value={password}
        />
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text
            style={{
              textAlign: 'right',
              fontSize: 15,
              fontFamily: Fonts.bold,
              color: 'black',
              marginTop: 8,
            }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={login}
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
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterScreen')}
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
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
