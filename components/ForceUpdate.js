/* eslint-disable react-native/no-inline-styles */
import {View, Text, Modal, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import styles from './styles';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect} from 'react';
import Service from '../services/services';
import {useSelector} from 'react-redux';
import {useCallback} from 'react';

export default function ForceUpdate() {
  const [forceUpdateModal, setforceUpdateModal] = useState(false);
  const {appVersion} = useSelector(state => state.auth);

  useEffect(() => {
    checkForceUpdate();
  }, [checkForceUpdate]);

  const checkForceUpdate = useCallback(async () => {
    const data = await Service.getFoceUpdate(appVersion);
    if (data && data?.success && data?.resultObj?.forceUpdateRequired) {
      setforceUpdateModal(true);
    }
  }, [appVersion]);

  return (
    <Modal visible={forceUpdateModal} transparent={true}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: Colors.modalShadowColor},
          ]}>
          <View style={styles.networkModalContent}>
            <Text style={styles.networkErrorText}>
              Please download the latest version of the app (VERSION) to ensure
              that you have the latest features.
            </Text>
            <View
              style={{
                ...styles.tryAgainBtn,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                testID="button"
                onPress={() =>
                  Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.azadi&pli=1',
                  )
                }>
                <Text style={styles.tryAgainTxt}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity testID="button">
                <Text style={styles.tryAgainTxt}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
