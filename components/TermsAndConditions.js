/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Alert, Linking} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Fonts from '../constants/Fonts';
import CheckBox from '@react-native-community/checkbox';
import {useEffect} from 'react';
import {getTCVersion, setTCVersion} from '../services/auth';
import {useSelector} from 'react-redux';
import Service from '../services/services';
export default function TermsAndConditions({tcAccepted}) {
  const [tcSelected, settcSelected] = useState(false);
  const [showTC, setshowTC] = useState(false);
  const {deviceID, appVersion} = useSelector(state => state.auth);
  const [currentTCVersion, setcurrentTCVersion] = useState(1);

  useEffect(() => {
    checkTC();
  }, []);
  const checkTC = async () => {
    console.log('deviceID', deviceID);

    const data = await getTCVersion();
    if (data === null) {
      setshowTC(true);
    } else {
      const tcVersion = await Service.getTCVersion(deviceID);
      if (
        (tcVersion &&
          tcVersion?.success &&
          tcVersion.resultObj?.requiredAccept) ||
        !tcVersion?.success
      ) {
        setshowTC(true);
        if (tcVersion && tcVersion?.success) {
          setcurrentTCVersion(tcVersion.resultObj?.currentVersion);
        }
      } else {
        tcAccepted(true);
      }
    }
    console.log('TCCC', data);
    console.log('Appp', appVersion);
  };
  const acceptTC = async () => {
    const data = {
      deviceID: deviceID,
      versionAccepted: currentTCVersion,
    };
    const tc = await Service.acceptTC(data);
    if (tc && tc?.success) {
      setTCVersion(data);
      setshowTC(false);
      tcAccepted(true);
    } else {
      Alert.alert('Error', 'Something went wrong', [
        {
          text: 'Try Again',
          onPress: acceptTC(),
        },
      ]);
    }
  };

  if (showTC) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <CheckBox
          value={tcSelected}
          onValueChange={() => {
            settcSelected(!tcSelected);
            acceptTC();
          }}
          // style={styles.checkbox}
        />
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://azadilocal.com/privacy_policy.html');
          }}>
          <Text style={{color: 'green', fontFamily: Fonts.regular}}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return null;
}
