/* eslint-disable react-native/no-inline-styles */
import {StatusBar, SafeAreaView, Platform} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabNavigator from './navigations/MainTabNavigator';
import {useSelector} from 'react-redux';
import Loading from './components/Loading';

const Stack = createNativeStackNavigator();

export default function App() {
  const {isLoading, loadingText} = useSelector(state => state.loading);
  // const navigation = useNavigation();
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
  return (
    <>
      <StatusBar animated={true} backgroundColor="green" />
      {checkSafeAreaView()}
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
    </>
  );
}
