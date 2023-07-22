/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

export default function ShopsCard({item, product}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      disabled={item.instock}
      onPress={() =>
        navigation.navigate('ShopDetailsSceen', {
          item,
          product,
        })
      }
      style={{
        width: 150,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: Colors.tabIconNotSelected,
        shadowOffset: {width: 0, height: 1},

        elevation: 8,
        marginVertical: 10,
        marginHorizontal: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          source={{
            uri: `https://d33fx86ztratj.cloudfront.net/${item?.logo}`,
          }}
          style={{width: '100%', height: 80, resizeMode: 'contain'}}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 10,
          fontFamily: Fonts.bold,
          marginTop: 10,
        }}>
        {item?.name}
      </Text>
      <Text
        numberOfLines={2}
        style={{
          textAlign: 'center',
          fontSize: 10,
          fontFamily: Fonts.regular,
          marginVertical: 5,
        }}>
        {item?.description?.replace(/<[^>]+>/g, '')}
      </Text>
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
    </TouchableOpacity>
  );
}
