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
import {SVGDownArrowBlack, SVGUp_Arrow} from '../../constants/images';
import {SvgXml} from 'react-native-svg';
import RenderHtml from 'react-native-render-html';
import Cards from '../../components/Cards';
import {useDispatch, useSelector} from 'react-redux';
import {setCartItem} from '../../Redux/productSlice';
import Carts from '../../components/Carts';
import {setCart} from '../../services/auth';
export default function ProductDetailsScreen(props) {
  const {item, product} = props.route.params;
  console.log('productID2', product);
  // const [product, setproduct] = useState({});
  const [showProductData, setshowProductData] = useState(true);
  // const [cartsItem, setcartsItem] = useState([])
  const {cartItem} = useSelector(state => state.product);
  const dispatch = useDispatch();
  const descHtml = {
    html: item?.description,
  };

  const {width} = useWindowDimensions();

  const addToCart = async () => {
    console.log('first');
    let cartArray = [];
    cartArray.push(item);
    dispatch(setCartItem([...cartArray, ...cartItem]));
    await setCart([...cartArray, ...cartItem]);
  };
  const renderImages = () => {
    return (
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
          <Image
            key={k}
            source={{uri: i}}
            style={{width: 370, height: 400, marginHorizontal: 10}}
            resizeMode="stretch"
            //   resizeMethod="resize"
          />
        ))}
      </ScrollView>
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
          <View
            style={{
              padding: 10,
              paddingHorizontal: 20,
              backgroundColor: '#fff',
              borderRadius: 10,
              shadowColor: Colors.modalShadowColor,
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.5,
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
