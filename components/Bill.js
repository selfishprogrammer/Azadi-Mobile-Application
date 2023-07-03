/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Line from './Line';
import {useSelector} from 'react-redux';

export default function Bill() {
  const {cartItem} = useSelector(state => state.product);
  const offerPrice = cartItem?.reduce(
    (sum, product) =>
      sum +
      Math.round(product?.price - (product?.price * product?.discount) / 100),
    0,
  );

  const actualPrice = cartItem?.reduce(
    (sum, product) => sum + Math.round(product?.price),
    0,
  );

  const toPay = offerPrice + 50;
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

        elevation: 4,
        marginTop: 10,
        // marginHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          //   flexWrap: 'wrap',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 14, fontFamily: Fonts.semiBold}}>
          Item Total
        </Text>
        <></>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 10,
              textDecorationColor: 'red',
              textDecorationLine: 'line-through',
              marginHorizontal: 10,
            }}>
            ₹{actualPrice}
          </Text>
          <Text style={{fontSize: 14, fontFamily: Fonts.semiBold}}>
            ₹{offerPrice}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          //   flexWrap: 'wrap',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 12, color: 'grey', fontFamily: Fonts.regular}}>
          Delivery Charge
        </Text>
        <Text style={{fontSize: 12, color: 'grey', fontFamily: Fonts.regular}}>
          ₹50
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
          //   flexWrap: 'wrap',
        }}>
        <Text style={{fontSize: 12, color: 'grey', fontFamily: Fonts.regular}}>
          Delivery Partner Tip
        </Text>
        <Text style={{fontSize: 12, color: 'grey', fontFamily: Fonts.regular}}>
          ₹0
        </Text>
      </View>
      <Line />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          //   flexWrap: 'wrap',
          marginVertical: 20,
        }}>
        <Text style={{fontSize: 14, fontFamily: Fonts.semiBold}}>To Pay</Text>
        <Text style={{fontSize: 14, fontFamily: Fonts.semiBold}}>₹{toPay}</Text>
      </View>
    </View>
  );
}
