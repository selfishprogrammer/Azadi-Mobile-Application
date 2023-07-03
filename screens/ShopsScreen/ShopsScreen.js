/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, ScrollView, FlatList, Text} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import NoProductFound from '../../components/NoProductFound';
import ShopsCard from '../../components/ShopsCard';
import Service from '../../services/services';
import {setallBusiness} from '../../Redux/productSlice';
import {useEffect} from 'react';
import Fonts from '../../constants/Fonts';
import {FILTER_LIST} from '../../constants/constants';
import Filter from '../../components/Filter';
import Cards from '../../components/Cards';
import {useState} from 'react';

export default function ShopsScreen() {
  const {allProductList, allBusiness} = useSelector(state => state.product);
  const dispatch = useDispatch();
  const [allBusinessState, setallBusinessState] = useState([]);
  const [secondHandBussiness, setsecondHandBussiness] = useState([]);

  useEffect(() => {
    getShopsRecord();
  }, [getShopsRecord]);

  const getShopsRecord = async () => {
    const shops = await Service.getAllBusiness();
    console.log('shops===>>>', shops);
    if (shops && shops?.success) {
      let showBussiness = shops?.resultObj.filter(i => {
        console.log('bussinessYpppp', i.businessType);
        return i.isActive && i.isVerified;
      });

      setallBusinessState(showBussiness);
      let secondHandBusiness = showBussiness.filter(i => {
        console.log('bussinessYpppp', i.businessType);
        return i.businessType === 'secondHand';
      });
      setsecondHandBussiness(secondHandBusiness);
      dispatch(setallBusiness(allBusinessState));
    } else {
    }
  };

  const renderShops = () => {
    if (allBusinessState.length > 0) {
      return (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={allBusinessState}
          renderItem={({item}) => (
            <ShopsCard
              product={allBusinessState}
              item={item}
              disabled={item.inStock}
            />
          )}
        />
      );
    } else {
      return <NoProductFound />;
    }
  };
  const renderSecondHandShops = () => {
    if (secondHandBussiness.length > 0) {
      return (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={secondHandBussiness}
          renderItem={({item}) => (
            <ShopsCard
              product={secondHandBussiness}
              item={item}
              disabled={item.inStock}
            />
          )}
        />
      );
    } else {
      return <NoProductFound />;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
      }}>
      <Header />

      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: 'black',
            fontSize: 12,
            textAlign: 'left',
            marginHorizontal: 13,
            marginTop: 10,
          }}>
          Shops/Business by categories
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={FILTER_LIST}
          renderItem={({item}) => (
            <Filter
              title={item.title}
              category={item.category}
              images={item.images}
              // onClickFilter={filterVal => handleFilter(filterVal, 'firstHand')}
            />
          )}
        />
        {renderShops()}
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: 'black',
            fontSize: 12,
            textAlign: 'left',
            marginHorizontal: 13,
            marginTop: 10,
          }}>
          Second hand Shops/Business
        </Text>
        {renderSecondHandShops()}
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: 'black',
            fontSize: 12,
            textAlign: 'left',
            marginHorizontal: 13,
            marginTop: 10,
          }}>
          Shops/Business by your currnt location
        </Text>
        {/* {renderShops()} */}
        {renderShops()}
        {console.log('allBusiness.length', allBusiness.length)}
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: 'black',
            fontSize: 12,
            textAlign: 'left',
            marginHorizontal: 13,
            marginTop: 10,
          }}>
          Product releated to shops
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={allProductList}
          renderItem={({item}) => (
            <Cards
              product={allProductList}
              item={item}
              disabled={item.inStock}
            />
          )}
        />
      </ScrollView>
    </View>
  );
}
