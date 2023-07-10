/* eslint-disable react-native/no-inline-styles */
import {StatusBar, SafeAreaView, Platform, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabNavigator from './navigations/MainTabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import Loading from './components/Loading';
import NetInfo from '@react-native-community/netinfo';
import {useEffect} from 'react';
import {setConnectionss} from './Redux/networkSlice';
import NetworkModal from './components/NetworkModal';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useCallback} from 'react';
import DeviceInfo from 'react-native-device-info';
import {setAppVersion, setDeviceID} from './Redux/authSlice';
import VersionCheck from 'react-native-version-check';
import ForceUpdate from './components/ForceUpdate';
import MaintenancePopup from './components/MaintenancePopup';

const Stack = createNativeStackNavigator();

export default function App() {
  const {isLoading, loadingText} = useSelector(state => state.loading);
  const {isConnected} = useSelector(state => state.network);

  const dispatch = useDispatch();
  // const navigation = useNavigation();
  useEffect(() => {
    checkInternet();
    getDeviceIDAndVersion();
    return () => {
      checkInternet();
    };
  }, [checkInternet, getDeviceIDAndVersion]);

  const checkInternet = useCallback(() => {
    NetInfo.addEventListener(intenetAval => {
      dispatch(setConnectionss(intenetAval.isConnected));
      console.log('isConnected', isConnected);
    });
  }, [dispatch, isConnected]);

  const getDeviceIDAndVersion = useCallback(async () => {
    const deviceID = await DeviceInfo.getUniqueId();
    dispatch(setDeviceID(deviceID));
    dispatch(setAppVersion(VersionCheck.getCurrentVersion()));
  }, [dispatch]);

  const statusText = isConnected ? 'Online' : 'Offline';
  const checkSafeAreaView = () => {
    if (Platform.OS === 'ios') {
      return (
        <SafeAreaView
          style={{
            flex: 0,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            backgroundColor: 'green',
          }}
        />
      );
    }
  };
  // if (!isConnected) {
  //   return <NetworkModal />;
  // }
  return (
    <SafeAreaProvider>
      <StatusBar animated={true} backgroundColor="green" />
      {checkSafeAreaView()}
      <MaintenancePopup />
      <ForceUpdate />
      <NetworkModal />
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <Loading spin={isLoading} text={loadingText} />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="botoomTab"
              options={{headerShown: false}}
              component={MainTabNavigator}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
