/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import {image_url} from '../../constants/Urls';
import {
  SEARCH_LISTS_BUSINESS,
  SEARCH_LISTS_PRODUCT,
} from '../../constants/constants';

export default function SearchProduct(props) {
  const {allProductList, allBusiness} = useSelector(state => state.product);
  const [searchArrat, setsearchArrat] = useState([]);
  const [suggestion, setsuggestion] = useState('');

  const navigation = useNavigation();
  const {screen} = props.route.params;
  var newSearchArray = [];
  const handleSearch = (e, sugg) => {
    // console.log('eope', e.length);
    if (e.length > 0 || e !== '') {
      console.log('screen', screen + e);
      console.log('sugggestionnn', sugg);
      switch (screen) {
        case 'Home':
          newSearchArray = allProductList.filter(i => {
            if (sugg === undefined) {
              return i.name.toUpperCase().includes(e.toUpperCase());
            } else {
              return (
                i.name.toUpperCase().includes(e.toUpperCase()) &&
                i.productType === sugg
              );
            }
          });
          break;
        case 'Shop':
          newSearchArray = allBusiness.filter(i => {
            if (sugg === undefined) {
              return i.name.toUpperCase().includes(e.toUpperCase());
            } else {
              return (
                i.name.toUpperCase().includes(e.toUpperCase()) &&
                i.businessType === sugg
              );
            }
          });
          console.log('newArray', newSearchArray);
          break;
      }
    }

    setsearchArrat(newSearchArray);
  };

  const renderImage = item => {
    if (screen === 'Home') {
      return (
        <Image
          source={{uri: item?.images[0]}}
          style={{width: 60, height: 60}}
          resizeMode="stretch"
          //   resizeMethod="resize"
        />
      );
    } else {
      return (
        <Image
          source={{uri: image_url + item?.logo}}
          style={{width: 60, height: 60}}
          resizeMode="stretch"
          //   resizeMethod="resize"
        />
      );
    }
  };
  const handleNavigation = item => {
    if (screen === 'Home') {
      navigation.navigate('ProductDetailsScreen', {
        item: item,
        product: allProductList,
      });
    } else {
      navigation.navigate('ShopDetailsSceen', {
        item: item,
        product: allBusiness,
      });
    }
  };

  const handleSuggestion = item => {
    item.backgroundColor === 'transparent'
      ? ((item.backgroundColor = 'green'),
        (item.borderWidth = 0),
        (item.color = 'white'),
        handleSearch(' ', item.type))
      : ((item.backgroundColor = 'transparent'),
        (item.borderWidth = 1),
        (item.color = 'black'),
        handleSearch(' ', undefined));
  };

  const renderSuggestedCategories = () => {
    if (screen === 'Home') {
      return (
        <FlatList
          keyExtractor={(i, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={SEARCH_LISTS_PRODUCT}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                borderRadius: 20,
                paddingHorizontal: 15,
                paddingBottom: 2,
                borderWidth: item.borderWidth,
                marginHorizontal: 5,
                backgroundColor: item.backgroundColor,
                marginVertical: 10,
                // width: '20%',
              }}
              onPress={() => handleSuggestion(item)}>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  textAlign: 'center',
                  color: item.color,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      );
    } else {
      return (
        <FlatList
          keyExtractor={(i, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={SEARCH_LISTS_BUSINESS}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                borderRadius: 20,
                paddingHorizontal: 15,
                paddingBottom: 2,
                borderWidth: item.borderWidth,
                marginHorizontal: 5,
                backgroundColor: item.backgroundColor,
                marginVertical: 10,
                // width: '20%',
              }}
              onPress={() => handleSuggestion(item)}>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  textAlign: 'center',
                  color: item.color,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      );
    }
  };
  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={{backgroundColor: '#fff'}}>
        <SearchBar onChangeCallback={e => handleSearch(e)} />
        {renderSuggestedCategories()}
        {searchArrat.length > 0 ? (
          <View
            style={{
              width: '100%',
              padding: 12,
              paddingHorizontal: 20,
              backgroundColor: '#fff',
              borderRadius: 3,
              shadowColor: Colors.modalShadowColor,
              shadowOffset: {width: 0, height: 1},

              elevation: 4,
            }}>
            {searchArrat.map((i, k) => (
              <TouchableOpacity
                key={k}
                onPress={() => handleNavigation(i)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '80%',
                  marginVertical: 10,
                }}>
                {renderImage(i)}

                <View style={{marginLeft: 10}}>
                  <Text numberOfLines={1} style={{fontFamily: Fonts.bold}}>
                    {i?.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: Fonts.regular,
                      color: 'grey',
                      fontSize: 10,
                    }}>
                    {i?.description?.replace(/<[^>]+>/g, '')}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </>
  );
}
