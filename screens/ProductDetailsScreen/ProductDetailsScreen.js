/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Fonts from '../../constants/Fonts';
import Header from '../../components/Header';
import Colors from '../../constants/Colors';
import {
  heart1,
  heart2,
  heart3,
  SVGDownArrowBlack,
  SVGUp_Arrow,
} from '../../constants/images';
import {SvgXml} from 'react-native-svg';
import RenderHtml from 'react-native-render-html';
import Cards from '../../components/Cards';
import {useDispatch, useSelector} from 'react-redux';
import {setBuyNow, setCartItem, setWishList} from '../../Redux/productSlice';
import Carts from '../../components/Carts';
import {setCart, setWishLists} from '../../services/auth';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useEffect} from 'react';

export default function ProductDetailsScreen(props) {
  const {item, product} = props.route.params;
  // const [product, setproduct] = useState({});
  const [showProductData, setshowProductData] = useState(true);
  const [showIshList, setshowIshList] = useState(false);
  const {cartItem, allBusiness, wishList} = useSelector(state => state.product);
  const dispatch = useDispatch();
  const descHtml = {
    html: item?.description,
  };
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const addToCart = async () => {
    let cartArray = [];
    cartArray.push(item);
    dispatch(setCartItem([...cartArray, ...cartItem]));
    await setCart([...cartArray, ...cartItem]);
  };

  const addTobuyNow = async () => {
    dispatch(setBuyNow());
    let buyNowArray = [];
    buyNowArray.push(item);
    dispatch(setBuyNow([...buyNowArray]));
    navigation.navigate('CheckOutScreen');
  };

  const handleWishList = async () => {
    let arr = [];
    let arr2 = [];
    let arr3 = wishList;
    if (arr3.includes(item?._id)) {
      console.log('wishList.indexOf(item?._id)', wishList);
      arr2 = Array.from(arr3).splice(wishList.indexOf(item?._id), 1);
      console.log(Array.from(new Set(arr3)));
      dispatch(setWishList([arr2]));
      await setWishLists([arr2]);
    } else {
      arr.push(item?._id);
      dispatch(setWishList([...wishList, ...arr]));
      await setWishLists([...wishList, ...arr]);
      console.log('wishhhhhhh', wishList);
    }
  };
  const renderImages = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => handleWishList()}
          style={{position: 'absolute', zIndex: 9999, top: 0, right: 10}}>
          <FastImage
            source={wishList.includes(item?._id) ? heart3 : heart1}
            style={{width: 35, height: 35}}
          />
        </TouchableOpacity>
        <ScrollView
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          {item.images.map((i, k) => (
            <FastImage
              key={k}
              source={{uri: i}}
              style={{width: 370, height: 400, marginHorizontal: 10}}
              //   resizeMethod="resize"
              resizeMode={FastImage.resizeMode.stretch}
            />
          ))}
        </ScrollView>
      </>
    );
  };

  const renderPriceAndAddToCart = () => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: Fonts.bold,
              marginRight: 10,
            }}>
            ₹{Math.round(item?.price - (item?.price * item?.discount) / 100)}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontFamily: Fonts.semiBold,
              marginRight: 10,
              textDecorationLine: 'line-through',
              color: 'grey',
            }}>
            ₹{item?.price}
          </Text>
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 8,
              borderRadius: 8,
              backgroundColor: '#7a0085',
            }}>
            <Text
              style={{
                fontSize: 10,
                color: 'white',
                fontFamily: Fonts.semiBold,
                marginRight: 10,
                textAlign: 'center',
              }}>
              {item?.discount}% off
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => addTobuyNow()}
          style={{
            borderRadius: 8,
            backgroundColor: '#8f0070',
            padding: 10,
          }}>
          <Text style={{fontFamily: Fonts.bold, fontSize: 12, color: '#fff'}}>
            BUY NOW
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addToCart}
          style={{
            borderRadius: 8,
            backgroundColor: '#8f0070',
            padding: 10,
          }}>
          <Text style={{fontFamily: Fonts.bold, fontSize: 12, color: '#fff'}}>
            ADD TO CART
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDescription = () => {
    if (showProductData) {
      return <RenderHtml contentWidth={width} source={descHtml} />;
    }
    return null;
  };

  const renderProduct = () => {
    if (product?.length > 0) {
      return (
        <ScrollView
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            paddingBottom: 5,
          }}>
          {product?.map((item2, key) => (
            <Cards
              item={item2}
              key={key}
              product={product}
              disabled={item2.inStock}
            />
          ))}
        </ScrollView>
      );
    }
  };

  const handleBusiness = () => {
    // const business = [];
    // console.log('item.business.category', item.business.category);
    // product.map((i, k) => {
    //   console.log('i.business.category', i.business.category);
    //   console.log('i.business?._id', i.business?._id);

    //   if (
    //     i.category === item.business.category &&
    //     i.business?._id !== item.business?._id
    //   ) {
    //     business.map((i2, k2) => {
    //       console.log('i2.business._id', i2.business._id);

    //       if (i2?._id !== i.business._id || business.length <= 0) {
    //         business.push(i.business);
    //       }
    //     });
    //   }
    // });

    navigation.navigate('ShopDetailsSceen', {
      item: item.business,
      product: allBusiness,
    });
  };
  const renderCart = () => {
    if (cartItem?.length > 0) {
      return (
        <View
          style={{
            position: 'absolute',
            zIndex: 99999,
            bottom: 0,
            width: '90%',
            alignSelf: 'center',
            marginVertical: 10,
            // marginBottom: 40,
          }}>
          <Carts />
        </View>
      );
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {renderCart()}
      <Header />
      <ScrollView>
        {renderImages()}
        <View style={{margin: 20}}>
          <Text
            style={{
              textAlign: 'left',
              fontFamily: Fonts.semiBold,
              fontSize: 15,
            }}>
            {item?.name}
          </Text>
          {renderPriceAndAddToCart()}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: Fonts.bold,
                color: 'black',
                fontSize: 14,
                textAlign: 'center',
              }}>
              Delivering to you in 15 mins
            </Text>
            <TouchableOpacity
              onPress={() => handleBusiness()}
              style={{
                padding: 5,
                borderWidth: 1,
                borderColor: 'green',
                borderRadius: 8,
                width: '40%',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 14,
                  textAlign: 'center',
                  color: 'green',
                  lineHeight: 20,
                }}>
                Go to {item?.business?.name}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 10,
              paddingHorizontal: 20,
              backgroundColor: '#fff',
              borderRadius: 10,
              shadowColor: Colors.modalShadowColor,
              shadowOffset: {width: 0, height: 1},

              elevation: 4,
              marginTop: 20,
              marginHorizontal: 0,
            }}>
            <Pressable
              onPress={() => setshowProductData(state => !state)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 15,
                  lineHeight: 25,
                }}>
                About Product
              </Text>
              <SvgXml
                xml={showProductData ? SVGUp_Arrow : SVGDownArrowBlack}
                width="15"
                height="15"
              />
            </Pressable>
            {renderDescription()}
          </View>
          <Text
            style={{
              textAlign: 'left',
              fontFamily: Fonts.bold,
              fontSize: 15,
              marginTop: 20,
              marginBottom: 5,
            }}>
            Similar Products
          </Text>
          {renderProduct()}
          <Text
            style={{
              textAlign: 'left',
              fontFamily: Fonts.bold,
              fontSize: 15,
              marginTop: 20,
              marginBottom: 5,
            }}>
            You Might Also Like
          </Text>
          {renderProduct()}
        </View>
      </ScrollView>
    </View>
  );
}
