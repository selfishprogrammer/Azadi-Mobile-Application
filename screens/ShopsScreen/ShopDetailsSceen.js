/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {image_url} from '../../constants/Urls';
import Fonts from '../../constants/Fonts';
import {useState} from 'react';
import Colors from '../../constants/Colors';
import {SVGDownArrowBlack, SVGUp_Arrow} from '../../constants/images';
import {SvgXml} from 'react-native-svg';
import RenderHtml from 'react-native-render-html';
import ShopsCard from '../../components/ShopsCard';
import {useSelector} from 'react-redux';
import Cards from '../../components/Cards';
import NoProductFound from '../../components/NoProductFound';
import NoShopFound from '../../components/NoShopFound';

export default function ShopDetailsSceen(props) {
  const {item, product} = props.route.params;
  console.log('item', item);
  const [showProductData, setshowProductData] = useState(true);
  //   const [releatedBusiness, setreleatedBusiness] = useState([]);
  const {allProductList} = useSelector(state => state.product);

  const descHtml = {
    html: item?.description,
  };
  //   const releatedOtherBusiness = () => {
  var relelatedBussiness = product.filter(i => {
    return i?.category === item?.category;
  });

  var productReleatedToParticularBusiness = allProductList.filter(i => {
    return i.business?._id === item?._id;
  });
  // setreleatedBusiness(arr);
  //   };
  const renderReleatedBussiness = () => {
    if (relelatedBussiness.length > 0) {
      return (
        <FlatList
          keyExtractor={(i, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={relelatedBussiness}
          renderItem={({item}) => (
            <ShopsCard
              product={relelatedBussiness}
              item={item}
              disabled={item.inStock}
            />
          )}
        />
      );
    }
    return <NoShopFound />;
  };
  const renderReleatedProduct = () => {
    if (productReleatedToParticularBusiness.length > 0) {
      return (
        <FlatList
          keyExtractor={(i, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={productReleatedToParticularBusiness}
          renderItem={({item}) => (
            <Cards
              product={productReleatedToParticularBusiness}
              item={item}
              disabled={item.inStock}
            />
          )}
        />
      );
    }
    return <NoProductFound />;
  };
  const {width} = useWindowDimensions();
  const renderDescription = () => {
    if (showProductData) {
      return <RenderHtml contentWidth={width} source={descHtml} />;
    }
    return null;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <Header />
      <ScrollView>
        <Image
          source={{uri: image_url + item?.logo}}
          style={{width: '95%', height: 300, marginHorizontal: 10}}
          // resizeMode="contain"
          resizeMethod="resize"
        />
        <View style={{margin: 20}}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.semiBold,
              fontSize: 20,
            }}>
            {item?.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                // marginVertical: 20,
              }}>
              <Image
                source={{
                  uri: 'https://cdn.onlinewebfonts.com/svg/img_342243.png',
                }}
                style={{width: 20, height: 20}}
              />
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 15,
                  lineHeight: 25,
                  marginLeft: 10,
                }}>
                {item?.category}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                // marginVertical: 20,
              }}>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 15,
                  marginLeft: 10,
                }}>
                3.4
              </Text>
              <Image
                source={{
                  uri: 'https://pixlok.com/wp-content/uploads/2021/10/ic_star-2ku3.png',
                }}
                style={{width: 20, height: 20}}
              />
            </View>
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
                marginVertical: 10,
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
              fontFamily: Fonts.bold,
              color: 'black',
              fontSize: 15,
              textAlign: 'left',
              marginHorizontal: 13,
              marginTop: 20,
            }}>
            Other Shops/Business releated to category
          </Text>
          {renderReleatedBussiness()}
          <Text
            style={{
              fontFamily: Fonts.bold,
              color: 'black',
              fontSize: 15,
              textAlign: 'left',
              marginHorizontal: 13,
              marginTop: 20,
            }}>
            Products in Store
          </Text>
          {renderReleatedProduct()}
        </View>
      </ScrollView>
    </View>
  );
}
