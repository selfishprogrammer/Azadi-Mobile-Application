/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import TextInputField from '../../components/TextInputField';
import {useState} from 'react';
import Service from '../../services/services';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {setLoading} from '../../Redux/loaderSlice';
import {getUser} from '../../services/auth';

export default function ContactScreen() {
  const [name, setname] = useState('');
  const [nameHasError, setnameHasError] = useState('');
  const [email, setemail] = useState('');
  const [emailHasError, setemailHasError] = useState('');
  const [phone, setphone] = useState('');
  const [phoneHasError, setphoneHasError] = useState('');
  const [queries, setqueries] = useState('');
  const [queriesHasError, setqueriesHasError] = useState('');
  const navigation = useNavigation();
  const {isLogin} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(async () => {
    if (isFocused) {
      const userData = JSON.parse(await getUser());
      if (userData !== null) {
        // console.log('userData', userData);
        setname(userData?.name);
        setemail(userData?.email);
        setphone(userData?.mobile);
      }
    }
  }, [isFocused]);

  const submitFeedbck = async () => {
    var emailReg =
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (name.length <= 0) {
      setnameHasError('Field Cannot Be Empty!');
    }
    if (email.length <= 0) {
      setemailHasError('Field Cannot Be Empty!');
    }
    if (phone.length <= 0) {
      setphoneHasError('Please enter your phone number');
    }
    if (queries.length <= 0) {
      setqueriesHasError('Please enter your Queries');
    } else {
      if (name.length <= 6 || name.length >= 15) {
        setnameHasError('Length Of Name Should Between 6 to 15 Character!');
      } else if (!emailReg.test(email)) {
        setemailHasError('please enter a valid E-Mail ID');
      } else if (phone.length < 10 || phone.length > 10) {
        setphoneHasError('please enter a valid phone numbe');
      } else {
        dispatch(setLoading(true));
        const submitData = {
          name,
          email,
          phone,
          query: queries,
        };
        const data = await Service.submitContactUs(submitData);
        if (data?.success && data) {
          Alert.alert('Success', data?.displayMessage, [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('HomeScreen'),
            },
          ]);
        } else {
          Alert.alert('Failure', data?.displayMessage, [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('HomeScreen'),
            },
          ]);
        }
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <ScrollView>
        <View
          style={{
            padding: 10,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            borderRadius: 3,
            shadowColor: Colors.modalShadowColor,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.5,
            elevation: 4,
            marginTop: 10,
            marginHorizontal: 10,
          }}>
          <Text style={{fontFamily: Fonts.bold, fontSize: 20}}>Contact Us</Text>
          <TextInputField
            label="Name"
            hasError={false}
            errorMsg={nameHasError}
            onHandelchage={e => setname(e)}
            value={name}
          />
          <TextInputField
            label="Email"
            hasError={false}
            errorMsg={emailHasError}
            onHandelchage={e => setemail(e)}
            value={email}
          />
          <TextInputField
            label="Mobile Number"
            hasError={false}
            errorMsg={phoneHasError}
            onHandelchage={e => setphone(e)}
            value={phone}
            type="numeric"
          />
          <TextInputField
            label="Enter your queries"
            height={100}
            multiline={true}
            hasError={false}
            errorMsg={queriesHasError}
            onHandelchage={e => setqueries(e)}
            value={queries}
          />

          <TouchableOpacity
            onPress={submitFeedbck}
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
              Submit Query
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
