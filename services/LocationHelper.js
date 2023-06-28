import {Alert, Linking, Platform} from 'react-native';
import Permission from '../constants/Permissions';
import RNLocation from 'react-native-location';
import {store} from '../Redux/store';
import Service from './services';
import {setAddress} from '../Redux/addressSlice';
import {setLoading, setLoadingText} from '../Redux/loaderSlice';
const callPermission = async () => {
  return await Permission.askLocation()
    .then(async hasLocationPermission => {
      // console.log('hasLocationPermission=>>>', hasLocationPermission);
      if (hasLocationPermission) {
        return await getUserLocation();
      } else {
        deniedAlert();
      }
    })
    .catch(err => console.log(err));
};

const deniedAlert = (title, msg) => {
  Alert.alert(
    'Allow Location',
    'Azadi wants to get your location to suggest a product / business around you',
    [{text: 'Allow', onPress: () => goToAppSettings()}],
  );
};

const goToAppSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.canOpenURL('app-settings:').then(canOpenURL => {
      if (canOpenURL) {
        Linking.openURL('app-settings:');
      } else {
        Alert.alert(
          'Allow Location',
          'Azadi wants to get your location to suggest a product / business around you',
        );
      }
    });
  } else {
    Linking.openSettings();
  }
};

const getUserLocation = async (androidProvider = 'auto') => {
  // dispatch(setLoading(true));
  RNLocation.configure({
    distanceFilter: 1, // Meters
    desiredAccuracy: {
      ios: 'best',
      android: 'balancedPowerAccuracy',
    },
    // Android only
    androidProvider,
  });

  RNLocation.requestPermission({
    ios: 'whenInUse',
    android: {
      detail: 'coarse',
    },
  })
    .then(granted => {
      // console.log('granted', granted);
      if (granted) {
        store.dispatch(setLoadingText('Getting your location'));
        store.dispatch(setLoading(true));
        RNLocation.subscribeToLocationUpdates(async locations => {
          const location = await Service.getUserLocation(
            locations[0]?.latitude,
            locations[0].longitude,
          );
          // console.log('location', location);
          if (location && location?.place_id) {
            store.dispatch(setAddress(location));
            store.dispatch(setLoadingText(''));
            store.dispatch(setLoading(false));
          } else {
            store.dispatch(setLoadingText(''));
            store.dispatch(setLoading(false));
            Alert.alert('Error', 'Failed to fetch location', [
              {
                text: 'Retry',
                onPress: () => getUserLocation(),
              },
              {
                text: 'Later',
                onPress: () => callPermission(),
                style: 'cancel',
              },
            ]);
          }
        });
        return true;
      } else {
        callPermission();
        return false;
      }
    })
    .catch(e => console.log('e', e));
};
export default getUserLocation;
