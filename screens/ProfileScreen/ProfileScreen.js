/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import NonLoggedInProfile from '../../components/NonLoggedInProfile';
import {getUser} from '../../services/auth';
import LoggedInProfile from '../../components/LoggedInProfile';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Header from '../../components/Header';

export default function ProfileScreen() {
  const [users, setusers] = useState(null);
  const {isLogin} = useSelector(state => state.auth);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getUserDetails();
    }
  }, [isFocused]);

  const getUserDetails = async () => {
    let userDetails = await getUser();
    setusers(userDetails);
  };
  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
        {isLogin === false ? <NonLoggedInProfile /> : <LoggedInProfile />}
      </ScrollView>
    </>
  );
}
