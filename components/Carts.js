/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {cartIcon} from '../constants/images';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
export default function Carts() {
  const {cartItem} = useSelector(state => state.product);
  const navigation = useNavigation();
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

  const rsSaved = actualPrice - offerPrice;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CartDetailsScreen')}
      style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: Colors.modalShadowColor,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        elevation: 8,
        // height: 60,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          backgroundColor: '#EEDC08',
          borderTopEndRadius: 12,
          borderTopStartRadius: 12,
        }}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/181/181574.png',
          }}
          style={{width: 20, height: 20, marginHorizontal: 10}}
        />
        <Text
          style={{fontFamily: Fonts.bold, color: 'black', alignSelf: 'center'}}>
          Add Items ₹150 more to save ₹25
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'green',
          borderBottomEndRadius: 12,
          borderBottomStartRadius: 12,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <SvgXml xml={cartIcon} />
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: Fonts.semiBold,
                  marginHorizontal: 10,
                }}>
                ₹{offerPrice}
              </Text>
              <View
                style={{
                  padding: 3,
                  borderRadius: 5,
                  backgroundColor: 'orange',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: Fonts.semiBold,
                    marginHorizontal: 10,
                  }}>
                  ₹{rsSaved} Saved
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: 'white',
                fontFamily: Fonts.regular,
                marginHorizontal: 10,
              }}>
              {cartItem?.length} items
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontFamily: Fonts.bold, color: 'white'}}>CART</Text>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Arrow_icon_gray.svg/1200px-Arrow_icon_gray.svg.png',
            }}
            style={{width: 20, height: 20, marginLeft: 5}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
