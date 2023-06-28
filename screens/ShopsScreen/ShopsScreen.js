/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {useSelector} from 'react-redux';
import Cards from '../../components/Cards';
import NoProductFound from '../../components/NoProductFound';
import ShopsCard from '../../components/ShopsCard';
import Fonts from '../../constants/Fonts';

export default function ShopsScreen() {
  const {allBusiness} = useSelector(state => state.product);
  // console.log('allBusiness', Array.from(new Set(allBusiness)));
  //   let arr = [allBusiness[0]];
  //   allBusiness.forEach(element => {
  //     console.log(arr.includes(element?._id));
  //     arr.forEach(element2 => {
  //       if (element2?._id !== element?._id) {
  //         arr.push(element);
  //       }
  //     });
  //   });
  //   console.log('allBusiness2', [...new Set(arr)]);
  const renderShops = () => {
    if (allBusiness.length > 0) {
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
          {allBusiness.map((item, key) => (
            <ShopsCard
              item={item}
              key={key}
              product={allBusiness}
              disabled={item.inStock}
            />
          ))}
        </ScrollView>
      );
    } else {
      return <NoProductFound />;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Header />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black', fontFamily: Fonts.bold, fontSize: 20}}>
          We are Coming Soon!
        </Text>
        {/* {renderShops()} */}
      </ScrollView>
    </View>
  );
}
