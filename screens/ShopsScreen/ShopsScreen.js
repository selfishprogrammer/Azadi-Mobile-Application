/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, ScrollView, FlatList, Text, RefreshControl} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import NoProductFound from '../../components/NoProductFound';
import ShopsCard from '../../components/ShopsCard';
import Service from '../../services/services';
import {setallBusiness} from '../../Redux/productSlice';
import {useEffect} from 'react';
import Fonts from '../../constants/Fonts';
import {FILTER_LIST, SERVICES_LIST} from '../../constants/constants';
import Filter from '../../components/Filter';
import {useState} from 'react';
import SearchBar from '../../components/SearchBar';

export default function ShopsScreen() {
  const dispatch = useDispatch();
  const [allBusinessState, setallBusinessState] = useState([]);
  const [secondHandBussiness, setsecondHandBussiness] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  const {buyNow, allBusiness} = useSelector(state => state.product);

  useEffect(() => {
    getShopsRecord();
  }, []);
  const handleServices = () => {};

  const getShopsRecord = async () => {
    const shops = await Service.getAllBusiness();
    console.log('shops===>>>', shops);
    if (shops && shops?.success) {
      let showBussiness = shops?.resultObj.filter(i => {
        console.log('bussinessYpppp', i.businessType);
        return i.isActive && i.isVerified;
      });
      console.log('show==>', showBussiness.length);
      dispatch(setallBusiness([...showBussiness]));
      setallBusinessState(showBussiness);
      let secondHandBusiness = showBussiness.filter(i => {
        console.log('bussinessYpppp', i.businessType);
        return i.businessType === 'secondHand';
      });
      setsecondHandBussiness(secondHandBusiness);
    } else {
    }
  };
  const handleFilter = (filterValue, type) => {
    setallBusinessState([]);
    console.log('flterValue', filterValue);
    if (type === 'firstHand') {
      if (filterValue !== '') {
        console.log(
          allBusinessState,
          'allBusinessStateallBusinessStateallBusinessState',
        );
        const newBusiness = allBusiness.filter(item => {
          return item.category === filterValue;
        });
        setallBusinessState(newBusiness);
      } else {
        setallBusinessState(allBusinessState);
      }
    } else if (type === 'secondHand') {
      if (filterValue !== '') {
        const newBusiness = secondHandBussiness.filter(item => {
          return (
            item.category === filterValue && item?.businessType === 'secondHand'
          );
        });
        setsecondHandBussiness(newBusiness);
      } else {
        setsecondHandBussiness(secondHandBussiness);
      }
    }
  };
  const renderShops = () => {
    if (allBusinessState.length > 0) {
      return (
        <FlatList
          keyExtractor={(i, index) => index.toString()}
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
          keyExtractor={(i, index) => index.toString()}
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
  const onRefresh = () => {
    setrefreshing(true);
    getShopsRecord();
    setrefreshing(false);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Header />
      <SearchBar screen="Shop" />
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 10,
          marginVertical: 5,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }>
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
          keyExtractor={(i, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={FILTER_LIST}
          renderItem={({item}) => (
            <Filter
              title={item.title}
              category={item.category}
              images={item.images}
              onClickFilter={filterVal => handleFilter(filterVal, 'firstHand')}
            />
          )}
        />
        {renderShops()}
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: 'black',
            fontSize: 15,
            textAlign: 'left',
            marginHorizontal: 13,
            marginTop: 10,
          }}>
          Services
        </Text>

        <FlatList
          keyExtractor={(i, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={SERVICES_LIST}
          renderItem={({item}) => (
            <Filter
              keyExtractor={(item, index) => index.toString()}
              title={item.title}
              category={item.category}
              images={item.images}
              onClickFilter={filterVal => handleServices(filterVal)}
            />
          )}
        />

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
        <FlatList
          keyExtractor={(i, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={FILTER_LIST}
          renderItem={({item}) => (
            <Filter
              title={item.title}
              category={item.category}
              images={item.images}
              onClickFilter={filterVal => handleFilter(filterVal, 'secondHand')}
            />
          )}
        />
        {renderSecondHandShops()}
        {/* <Text
          style={{
            fontFamily: Fonts.bold,
            color: 'black',
            fontSize: 12,
            textAlign: 'left',
            marginHorizontal: 13,
            marginTop: 10,
          }}>
          Shops/Business by your currnt location
        </Text> */}
        {/* {renderShops()} */}
        {/* {renderShops()} */}
        {/* <Text
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
          keyExtractor={(i, index) => index.toString()}
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
        /> */}
      </ScrollView>
    </View>
  );
}
