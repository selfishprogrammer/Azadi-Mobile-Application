/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import {useSelector} from 'react-redux';
import Counter from '../../components/Counter';
import DeliveryPartnerTip from '../../components/DeliveryPartnerTip';
import Bill from '../../components/Bill';
import {useState} from 'react';
import {useEffect} from 'react';
import PaymentModal from '../../components/PaymentModal';
import NoCart from '../../components/NoCart';

export default function CartDetailsScreen() {
  const {cartItem} = useSelector(state => state.product);
  const [uniqueArrayCart, setuniqueArrayCart] = useState([]);

  useEffect(() => {
    let uniqueCart = [...new Set(cartItem)];
    setuniqueArrayCart(uniqueCart);
  }, [cartItem]);

  const renderPrice = item => {
    const priceArray = cartItem.filter(i => {
      return i === item;
    });
    const offerPrice = priceArray?.reduce(
      (sum, product) =>
        sum +
        Math.round(product?.price - (product?.price * product?.discount) / 100),
      0,
    );
    const actualPrice = priceArray?.reduce(
      (sum, product) => sum + Math.round(product?.price),
      0,
    );
    return {offerPrice: offerPrice, actualPrice: actualPrice};
  };

  const offerPriceFromCart = cartItem?.reduce(
    (sum, product) =>
      sum +
      Math.round(product?.price - (product?.price * product?.discount) / 100),
    0,
  );

  const offerDiscountPrice = cartItem?.reduce(
    (sum, product) => sum + Math.round(product?.price),
    0,
  );

  const rsSaved = offerDiscountPrice - offerPriceFromCart;

  const toPay = offerPriceFromCart + 50;

  if (cartItem.length === 0) {
    return <NoCart />;
  }

  const renderCartBox = () => {
    // let cartNew = [];
    // cartItem.forEach(element => {
    //   // if (!cartNew.includes(element)) {
    //   //   console.log('!cartNew.includes(element)', cartNew.includes(element));
    //   //   cartNew.push(element);
    //   // }
    //   console.log('element?._id', element?._id);
    //   if (cartNew.length === 0) {
    //     cartNew.push(element);
    //   }
    //   cartNew.forEach(item => {
    //     if (element?._id !== item?._id) {
    //       cartNew.push(element);
    //     }
    //   });
    // });
    return [...new Set(cartItem)].map((item, key) => (
      <View
        key={key}
        style={{
          padding: 10,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderRadius: 3,
          shadowColor: Colors.modalShadowColor,
          shadowOffset: {width: 0, height: 1},

          elevation: 4,
          marginTop: 10,
          marginHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '40%',
            }}>
            <Image
              source={{uri: item?.images[0]}}
              style={{width: 60, height: 60, marginHorizontal: 10}}
              resizeMode="stretch"
              //   resizeMethod="resize"
            />
            <Text style={{fontFamily: Fonts.bold, fontSize: 10}}>
              {item.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '40%',
            }}>
            {<Counter product={item} index={key} />}
            <View>
              <Text style={{fontFamily: Fonts.bold, fontSize: 12}}>
                ₹{renderPrice(item).offerPrice}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 10,
                  textDecorationColor: 'red',
                  textDecorationLine: 'line-through',
                }}>
                ₹{renderPrice(item).actualPrice}
              </Text>
            </View>
          </View>
        </View>
      </View>
    ));
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <ScrollView contentContainerStyle={{}}>
        <View style={{padding: 5, backgroundColor: 'yellow'}}>
          <Text
            style={{
              fontFamily: Fonts.regular,
              textAlign: 'center',
              fontSize: 12,
            }}>
            Yay! You've unlocked
            <Text style={{fontFamily: Fonts.bold, fontSize: 14}}>
              Free Delivery
            </Text>
          </Text>
        </View>
        <View style={{padding: 5, backgroundColor: '#F2F1E6'}}>
          <Text
            style={{
              fontFamily: Fonts.regular,
              textAlign: 'center',
              fontSize: 12,
            }}>
            You saved
            <Text
              style={{
                fontFamily: Fonts.bold,
                fontSize: 14,
                paddingHorizontal: 3,
              }}>
              ₹{rsSaved}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.regular,
                textAlign: 'center',
                fontSize: 12,
              }}>
              in this order
            </Text>
          </Text>
        </View>
        {renderCartBox()}

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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
              // justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/61/61521.png',
              }}
              style={{width: 20, height: 20}}
            />
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 14,
                marginHorizontal: 10,
              }}>
              Avail Offers / Coupons
            </Text>
          </View>
          <Image
            source={{
              uri: 'https://icon-library.com/images/greater-than-icon/greater-than-icon-14.jpg',
            }}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
        <DeliveryPartnerTip />
        <View style={{marginBottom: 200}}>
          <Bill toPay={toPay} />
        </View>
      </ScrollView>
      <PaymentModal toPay={toPay} />
    </View>
  );
}
