/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, TextInput, Image} from 'react-native';
import Fonts from '../constants/Fonts';
// import {Searchbar, TextInput} from 'react-native-paper';

const SearchBar = ({screen, onChangeCallback}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: 'green',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{width: '90%'}}>
        <TextInput
          onPressIn={() =>
            screen === 'Home' ? navigation.navigate('SearchProductScreen') : ''
          }
          placeholder="Search products and services"
          style={{
            borderWidth: 2,
            borderColor: 'white',
            height: 40,
            backgroundColor: '#fff',
            color: 'black',
            fontFamily: Fonts.bold,
            paddingHorizontal: 10,
            borderRadius: 8,
            paddingRight: 40,
          }}
          value={searchQuery}
          onChangeText={e => {
            setSearchQuery(e);
            onChangeCallback(e);
          }}
        />
        <View
          style={{
            position: 'absolute',
            right: 14,
            bottom: 4,
          }}>
          <Image
            source={{
              uri: 'https://www.citypng.com/public/uploads/small/11640084021s7j4kii6hsgshmcxlovq7siag8vktv9rhqscjbbuyse2favmnjhrpjhrgqcug2nqdcpxsmovtjjonzon74knmk3kywi3tpxrpg8r.png',
            }}
            style={{width: 30, height: 30}}
          />
        </View>
      </View>
      <Image
        source={{
          uri: 'https://icon-library.com/images/location-icon-white-png/location-icon-white-png-12.jpg',
        }}
        style={{width: 30, height: 30}}
      />
    </View>
  );
};

export default SearchBar;
