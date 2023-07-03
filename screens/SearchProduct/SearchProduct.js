/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {useNavigation} from '@react-navigation/native';

export default function SearchProduct() {
  const {allProductList} = useSelector(state => state.product);
  const [searchArrat, setsearchArrat] = useState([]);
  const navigation = useNavigation();
  var newSearchArray = [];
  const handleSearch = e => {
    // console.log('eope', e.length);
    if (e.length > 0 || e !== '') {
      newSearchArray = allProductList.filter(i => {
        return i.name.toUpperCase().includes(e.toUpperCase());
      });
    }

    // console.log('newArray', newSearchArray.length);
    setsearchArrat(newSearchArray);
  };
  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
        <SearchBar onChangeCallback={e => handleSearch(e)} />
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
                onPress={() =>
                  navigation.navigate('ProductDetailsScreen', {
                    item: i,
                    product: allProductList,
                  })
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '80%',
                  marginVertical: 10,
                }}>
                <Image
                  source={{uri: i?.images[0]}}
                  style={{width: 60, height: 60}}
                  resizeMode="stretch"
                  //   resizeMethod="resize"
                />
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
