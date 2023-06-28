/* eslint-disable react-native/no-inline-styles */
import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import Cards from '../../components/Cards';
import {useState} from 'react';
import {useEffect} from 'react';
import Service from '../../services/services';
import Fonts from '../../constants/Fonts';
import Filter from '../../components/Filter';
import {
  FILTER_LIST,
  HOME_CARAOUSEL,
  SERVICES_LIST,
} from '../../constants/constants';
import HomeSlider from '../../components/HomeSlider';
import NoProductFound from '../../components/NoProductFound';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import Carts from '../../components/Carts';
import {useDispatch, useSelector} from 'react-redux';
import getUserLocation from '../../services/LocationHelper';
import {setallBusiness, setallProductList} from '../../Redux/productSlice';
export default function HomeScreen() {
  const [allProduct, setallProduct] = useState([]);
  const [filterProduct, setfilterProduct] = useState([]);
  const [secondHandProduct, setsecondHandProduct] = useState([]);
  const {cartItem} = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProduct();
    getUserLocation();
  }, []);

  const handleServices = () => {};

  const getAllProduct = async () => {
    const pro = await Service.getAllProduct();
    if (pro && pro.success) {
      const proArray = pro.resultObj.filter(item => {
        return (
          item.isActive && item.inStock && item.productType !== 'secondHand'
        );
      });
      const secondHand = pro.resultObj.filter(item => {
        return (
          item.isActive && item.inStock && item?.productType === 'secondHand'
        );
      });
      const allBusiness = [];
      pro.resultObj.forEach(i => allBusiness.push(i.business));
      setallProduct(proArray);
      dispatch(setallProductList(proArray));
      setfilterProduct(proArray);
      setsecondHandProduct(secondHand);
      dispatch(setallBusiness(allBusiness));
    }
  };
  const handleFilter = (filterValue, type) => {
    if (type === 'firstHand') {
      if (filterValue !== '') {
        const newProduct = allProduct.filter(item => {
          return item.category === 'Others';
        });
        setfilterProduct(newProduct);
      } else {
        setfilterProduct(allProduct);
      }
    } else if (type === 'secondHand') {
      if (filterValue !== '') {
        const newProduct = secondHandProduct.filter(item => {
          return (
            item.category === 'Others' && item?.productType === 'secondHand'
          );
        });
        setsecondHandProduct(newProduct);
      } else {
        setsecondHandProduct(allProduct);
      }
    }

    // FILTER_LIST[backGColor].color = 'orange';
    // setbackGClr(FILTER_LIST[backGColor].color);
  };

  const renderProduct = () => {
    if (filterProduct.length > 0) {
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
          {filterProduct.map((item, key) => (
            <Cards
              item={item}
              key={key}
              product={filterProduct}
              disabled={item.inStock}
            />
          ))}
        </ScrollView>
      );
    } else {
      return <NoProductFound />;
    }
  };

  const renderSecondHandProduct = () => {
    if (secondHandProduct.length > 0) {
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
          {secondHandProduct.map((item, key) => (
            <Cards
              item={item}
              key={key}
              product={secondHandProduct}
              disabled={item.inStock}
            />
          ))}
        </ScrollView>
      );
    } else {
      return <NoProductFound />;
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
    <>
      <Header />

      {renderCart()}
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        {/* <TouchableOpacity> */}
        <SearchBar screen="Home" />
        {/* </TouchableOpacity> */}
        <ScrollView
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            alignItems: 'center',
          }}>
          {HOME_CARAOUSEL.map((item, key) => (
            <HomeSlider url={item} key={key} />
          ))}
        </ScrollView>
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: 'black',
            fontSize: 15,
            textAlign: 'left',
            marginHorizontal: 13,
            marginTop: 10,
          }}>
          Product by categories
        </Text>
        <ScrollView
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {FILTER_LIST.map((item, key) => (
            <Filter
              key={key}
              title={item.title}
              category={item.category}
              images={item.images}
              onClickFilter={filterVal => handleFilter(filterVal, 'firstHand')}
            />
          ))}
        </ScrollView>

        {renderProduct()}
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
        <ScrollView
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {SERVICES_LIST.map((item, key) => (
            <Filter
              key={key}
              title={item.title}
              category={item.category}
              images={item.images}
              onClickFilter={filterVal => handleServices(filterVal, key)}
            />
          ))}
        </ScrollView>
        {/* {renderProduct()} */}
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: 'black',
            fontSize: 15,
            textAlign: 'left',
            marginHorizontal: 13,
            marginTop: 10,
          }}>
          Second Hand Products
        </Text>
        <ScrollView
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {FILTER_LIST.map((item, key) => (
            <Filter
              key={key}
              title={item.title}
              category={item.category}
              images={item.images}
              onClickFilter={filterVal => handleFilter(filterVal, 'secondHand')}
            />
          ))}
        </ScrollView>
        {renderSecondHandProduct()}
      </ScrollView>
    </>
  );
}
