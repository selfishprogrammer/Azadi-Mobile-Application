/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import styles from './styles';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect} from 'react';
import Service from '../services/services';

export default function MaintenancePopup() {
  const [showModal, setshowModal] = useState(false);
  const [maintenaceAval, setmaintenaceAval] = useState(false);
  const [msg, setmsg] = useState('');

  useEffect(() => {
    checkMaintenance();
  }, []);

  const checkMaintenance = async () => {
    const data = await Service.getMaintenace();
    if (
      data &&
      data?.success &&
      (data?.resultObj?.MaintenanceToggle ||
        data?.resultObj?.MaintenanceWarning)
    ) {
      setshowModal(true);
      setmaintenaceAval(data?.resultObj?.MaintenanceToggle);
      setmsg(data?.resultObj?.MaintenanceMsg);
    }
  };

  return (
    <Modal visible={showModal} transparent={true}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: Colors.modalShadowColor},
          ]}>
          <View style={styles.networkModalContent}>
            <Text style={styles.networkErrorText}>{msg}</Text>
            {!maintenaceAval ? (
              <TouchableOpacity
                testID="button"
                style={styles.tryAgainBtn}
                onPress={() => setshowModal(false)}>
                <Text style={styles.tryAgainTxt}>Ok</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
