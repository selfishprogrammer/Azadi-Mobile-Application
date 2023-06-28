import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export default class Permission {
  constructor() {
    this.locationCurrentPosition = '';
  }

  static hasLocationPermission = async () => {
    return new Promise((resolve, reject) => {
      let hasPermission = false;

      if (Platform.OS === 'ios') {
        check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          .then(result => {
            console.warn('///', result);
            switch (result) {
              case RESULTS.UNAVAILABLE:
                hasPermission = false;
                break;
              case RESULTS.DENIED:
                hasPermission = false;
                break;
              case RESULTS.GRANTED:
                hasPermission = true;
                break;
              case RESULTS.BLOCKED:
                hasPermission = false;
                break;
            }
            resolve(hasPermission);
          })
          .catch(() => {
            reject(false);
          });
      } else {
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                hasPermission = false;
                break;
              case RESULTS.DENIED:
                hasPermission = false;
                break;
              case RESULTS.GRANTED:
                hasPermission = true;
                break;
              case RESULTS.BLOCKED:
                hasPermission = false;
                break;
            }
            resolve(hasPermission);
          })
          .catch(() => {
            reject(false);
          });
      }
    });
  };

  static askLocation = async () => {
    if (Platform.OS === 'ios') {
      const status = await Geolocation.requestAuthorization('whenInUse');

      if (status === 'granted') {
        return true;
      }

      if (status === 'denied') {
        return false;
      }

      if (status === 'disabled') {
        return false;
      }
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      return false;
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      return false;
    }
  };
}
