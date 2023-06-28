/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from '../Redux/authSlice';
import {getUser, setLoggedIn, setUser} from '../services/auth';
import Fonts from '../constants/Fonts';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useState} from 'react';
import styles from './styles';

export default function LoggedInProfile() {
  const isFocused = useIsFocused();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(setLogin(false));
    await setUser(null);
    await setLoggedIn('false');
  };
  useEffect(async () => {
    if (isFocused) {
      const userData = JSON.parse(await getUser());
      if (userData !== null) {
        setname(userData?.name);
        setemail(userData?.email);
        setphone(userData?.mobile);
      }
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View
          style={{
            alignSelf: 'center',
            width: '100%',
            backgroundColor: 'green',
            borderBottomEndRadius: 40,
            borderBottomStartRadius: 40,
            padding: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Image
                source={{
                  uri: 'https://icon-library.com/images/user-profile-icon/user-profile-icon-15.jpg',
                }}
                style={{width: 70, height: 70}}
              />
              <View style={{marginHorizontal: 15}}>
                <Text
                  style={{fontFamily: Fonts.bold, color: '#fff', fontSize: 20}}>
                  {name}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.regular,
                    color: '#fff',
                    fontSize: 10,
                  }}>
                  {phone}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.regular,
                    color: '#fff',
                    fontSize: 10,
                  }}>
                  {email}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={logout}>
              <Image
                source={{
                  uri: 'https://icons.veryicon.com/png/o/object/material-design-icons-1/pencil-circle.png',
                }}
                style={{width: 35, height: 35, marginBottom: 50}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 20,
            }}>
            <View>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 14,
                  color: 'white',
                  textAlign: 'center',
                }}>
                FAVOURITE
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  fontSize: 14,
                  color: 'white',
                  textAlign: 'center',
                }}>
                0
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 14,
                  color: 'white',
                  textAlign: 'center',
                }}>
                WISHLIST
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  fontSize: 14,
                  color: 'white',
                  textAlign: 'center',
                }}>
                0
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: 14,
                  color: 'white',
                  textAlign: 'center',
                }}>
                REWARDS
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  fontSize: 14,
                  color: 'white',
                  textAlign: 'center',
                }}>
                0 Coins
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{...styles.button, marginTop: 50}}
          // onPress={() => {
          //   // navigation.navigate('ResetPasswordScreen', {
          //     from: 'ResetPasswordScreen',
          //     email: email,
          //   });
        >
          <Text style={styles.btnTxt2}>Change Password</Text>
          <Image
            style={{height: 22, width: 22}}
            source={{
              uri: 'https://icon-library.com/images/pencil-icon/pencil-icon-24.jpg',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // setsuccessModal(true);
          }}>
          <Text style={styles.btnTxt2}>Edit Account</Text>
          <Image
            style={{height: 22, width: 22}}
            source={{
              uri: 'https://icons.veryicon.com/png/o/construction-tools/coca-design/delete-189.png',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnTxt2}>Your Orders</Text>
          <Image
            style={{height: 22, width: 22}}
            source={{
              uri: 'https://www.pinpng.com/pngs/m/51-512369_png-file-svg-medical-records-icon-free-transparent.png',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnTxt2}>Refer & Earn</Text>
          <Image
            style={{height: 22, width: 22}}
            source={{
              uri: 'https://www.pinpng.com/pngs/m/51-512369_png-file-svg-medical-records-icon-free-transparent.png',
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.btnTxt2}>Logout</Text>
          <Image
            style={{height: 22, width: 22}}
            source={{
              uri: 'http://cdn.onlinewebfonts.com/svg/img_508769.png',
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
//  {/* <TouchableOpacity onPress={logout}>
//         <Text>LoggedInProfile</Text>
//       </TouchableOpacity> */}
