/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Counter from '../../components/Counter';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import BuyNowCounter from '../../components/BuyNowCounter';
import Header from '../../components/Header';
import DeliveryPartnerTip from '../../components/DeliveryPartnerTip';
import BuyNowBill from '../../components/BuyNowBill';
import PaymentModal from '../../components/PaymentModal';
export default function CheckOutScreen() {
  const {buyNow, allBusiness} = useSelector(state => state.product);
  //   console.log('fiallBusinessallBusinessallBusinessrst', allBusiness);
  const renderPrice = item => {
    const priceArray = buyNow.filter(i => {
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
  const offerPriceFromCart = buyNow?.reduce(
    (sum, product) =>
      sum +
      Math.round(product?.price - (product?.price * product?.discount) / 100),
    0,
  );

  const offerDiscountPrice = buyNow?.reduce(
    (sum, product) => sum + Math.round(product?.price),
    0,
  );

  const rsSaved = offerDiscountPrice - offerPriceFromCart;

  const toPay = offerPriceFromCart + 50;

  //   const businessName = allBusiness.filter(i => {
  //     return i?._id === buyNow[0]?.business?._id;
  //   });
  const renderCheckOut = () => {
    return [...new Set(buyNow)].map((item, key) => (
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
            {<BuyNowCounter product={item} index={key} />}
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
      <ScrollView>
        <Text
          style={{
            marginHorizontal: 15,
            marginTop: 10,
            marginBottom: 4,
            fontFamily: Fonts.bold,
            fontSize: 20,
          }}>
          {buyNow[0]?.business?.name}
        </Text>
        {renderCheckOut()}
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
          <BuyNowBill toPay={toPay} />
        </View>
      </ScrollView>
      <PaymentModal toPay={toPay} />
    </View>
  );
}
