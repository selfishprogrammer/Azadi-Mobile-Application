/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';

export default function Cards({item, disabled, product}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={!disabled}
      onPress={() =>
        navigation.navigate('ProductDetailsScreen', {
          item,
          product,
        })
      }
      style={{
        width: 150,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 2,
        shadowColor: '#fff',
        shadowOffset: {width: 0, height: 1},
        elevation: 3,
        marginVertical: 10,
        marginHorizontal: 5,
        borderWidth: 0.1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: item?.images[0],
          }}
          style={{width: 80, height: 80}}
        />
      </View>

      <Text
        style={{
          textAlign: 'center',
          fontSize: 10,
          fontFamily: Fonts.bold,
        }}>
        My Business
      </Text>

      <Text
        numberOfLines={1}
        style={{textAlign: 'center', fontSize: 12, fontFamily: Fonts.bold}}>
        {item?.name}
      </Text>
      <Text
        numberOfLines={2}
        style={{
          textAlign: 'center',
          fontSize: 10,
          fontFamily: Fonts.regular,
          marginVertical: 10,
        }}>
        {item?.description?.replace(/<[^>]+>/g, '')}
      </Text>
      <View style={{width: '80%', alignSelf: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: Fonts.semiBold,
            }}>
            ₹{Math.round(item?.price - (item?.price * item?.discount) / 100)}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontFamily: Fonts.semiBold,
              textDecorationLine: 'line-through',
            }}>
            ₹{item?.price}
          </Text>
          <Text style={{fontSize: 10, fontFamily: Fonts.semiBold}}>
            {item?.discount}%
          </Text>
        </View>

        <Rating
          // type="custom"
          // ratingImage={WATER_IMAGE}
          ratingColor="#c8c7c8"
          ratingBackgroundColor="#c8c7c8"
          ratingCount={5}
          imageSize={10}
          // onFinishRating={this.ratingCompleted}
          style={{marginTop: 10}}
          startingValue={3}
          readonly
        />
      </View>
    </TouchableOpacity>
  );
}
