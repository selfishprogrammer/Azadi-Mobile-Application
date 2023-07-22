/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Fonts from '../constants/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {setBuyNow} from '../Redux/productSlice';
import {setCart} from '../services/auth';

export default function BuyNowCounter({product}) {
  const {buyNow} = useSelector(state => state.product);
  const dispatch = useDispatch();
  let arrayPerCountById = buyNow.filter(i => {
    return i?._id === product?._id;
  });

  const handleIncrement = async () => {
    let buyNowArray = [];
    buyNowArray.push(product);
    dispatch(setBuyNow([...buyNowArray, ...buyNow]));
  };

  const handleDecrement = async () => {
    const index = buyNow.indexOf(product);
    if (index !== -1) {
      const arrayDeleted = [
        ...buyNow.slice(0, index),
        ...buyNow.slice(index + 1),
      ];
      dispatch(setBuyNow([...arrayDeleted]));
    }

    // let cartArray = cartItem;
    // let deletedIndex = cartArray.indexOf(product);
    // if (deletedIndex !== -1) {
    //   cartArray.splice(deletedIndex, 1);
    // dispatch(setBuyNow([...cartArray]));
    // await setCart([...cartArray]);
    // }

    // }
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '50%',
        marginLeft: 16,
        borderWidth: 1,
      }}>
      <TouchableOpacity onPress={handleDecrement}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.bold,
            color: '#000000',
          }}>
          –
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          fontFamily: Fonts.bold,
          color: '#000000',
        }}>
        {arrayPerCountById.length}
      </Text>
      <TouchableOpacity onPress={handleIncrement}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.bold,
            color: '#000000',
          }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}
