import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {Modal} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../constants/Colors';
import styles from './styles';
import {useEffect} from 'react';
import {useState} from 'react';

export default function NetworkModal() {
  const {isConnected, refScreen} = useSelector(state => state.network);
  const [networkModal, setnetworkModal] = useState(!isConnected);
  console.log('isConnected=>>>>', isConnected);

  useEffect(() => {
    if (!isConnected) {
      setnetworkModal(!isConnected);
    }
  }, [isConnected]);
  const checkNetworkConnections = () => {
    setnetworkModal(false);
    if (isConnected) {
      // when you have connected to the internet and click on try again in network modal, the. we are setting "props.setShowOtherModal(true)"
      // the reason we are doing this is bcz you have the internet connection and there wouln't be any network modal and
      //that time we can show other modal by setting this to true
      //   props.setShowOtherModal(true);
      //   console.log('reloadScreen=>>>>', reloadScreen);
      //   if (reloadScreen) {
      //   refScreen.refresh();
      //     props.getTranslation();
      //   }
      //   window.location.reload();
    } else {
      setTimeout(() => {
        setnetworkModal(true);
      }, 300);
    }
  };
  return (
    <Modal visible={networkModal} transparent={true}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: Colors.modalShadowColor},
          ]}>
          <View style={styles.networkModalContent}>
            <Text style={styles.networkErrorText}>
              You are offline please try again
            </Text>
            <TouchableOpacity
              testID="button"
              style={styles.tryAgainBtn}
              onPress={checkNetworkConnections}>
              <Text style={styles.tryAgainTxt}>Try again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
