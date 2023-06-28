/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useSelector} from 'react-redux';

export default function PaymentModal({toPay}) {
  const {address} = useSelector(state => state.address);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        zIndex: 9999,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: Colors.modalShadowColor,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
      }}>
      <View
        style={{
          backgroundColor: '#97B617',
          padding: 15,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          marginBottom: 10,
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: Fonts.bold,
            color: '#fff',
            fontSize: 14,
            textAlign: 'center',
          }}>
          Delivering to you in 15 mins
        </Text>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <View style={{width: '60%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: 'https://www.iconpacks.net/icons/2/free-location-pointer-icon-2961-thumb.png',
                }}
                style={{width: 20, height: 20}}
              />
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: Fonts.bold,
                  color: '#000000',
                  fontSize: 10,
                }}>
                {address?.display_name}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                color: 'green',
                fontSize: 11,
                fontFamily: Fonts.regular,
              }}>
              CHANGE ADDRESS
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 25,
          }}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: 'red',
              borderRadius: 8,
              width: '80%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: 12,
                fontFamily: Fonts.bold,
              }}>
              CONTINUE TO PAYMENT
            </Text>
          </TouchableOpacity>
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: '#000000',
                fontSize: 16,
                fontFamily: Fonts.bold,
              }}>
              ₹{toPay}
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'green',
                  fontSize: 12,
                  fontFamily: Fonts.regular,
                }}>
                VIEW BILL
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
