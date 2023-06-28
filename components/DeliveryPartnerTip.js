/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default function DeliveryPartnerTip() {
  return (
    <View
      style={{
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        width: '100%',
        padding: 12,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 3,
        shadowColor: Colors.modalShadowColor,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        elevation: 4,
        marginTop: 10,
        // marginHorizontal: 10,
      }}>
      <Text style={{fontFamily: Fonts.semiBold, fontSize: 14, marginBottom: 3}}>
        Tip To Your Delivery Partner
      </Text>
      <Text style={{fontFamily: Fonts.regular, fontSize: 10, color: 'grey'}}>
        The entire amonut will be sent to your delivery partner
      </Text>
      <View
        style={{
          flexDirection: 'row',
          //   justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginVertical: 15,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            padding: 7,
            borderWidth: 1,
            marginHorizontal: 12,
            width: '20%',
          }}>
          <Text style={{fontFamily: Fonts.bold, textAlign: 'center'}}>₹10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            padding: 7,
            borderWidth: 1,
            marginHorizontal: 5,
            width: '20%',
          }}>
          <Text style={{fontFamily: Fonts.bold, textAlign: 'center'}}>₹20</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            padding: 7,
            borderWidth: 1,
            marginHorizontal: 5,
            width: '20%',
          }}>
          <Text style={{fontFamily: Fonts.bold, textAlign: 'center'}}>₹30</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 20,
            padding: 7,
            borderWidth: 1,
            marginHorizontal: 5,
            width: '20%',
          }}>
          <Text style={{fontFamily: Fonts.bold, textAlign: 'center'}}>
            Custom
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
