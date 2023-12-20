import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {height, width} from '../components/Diemenstions';
import CatagotyData from '../components/CatagotyData';
import {StackActions} from '@react-navigation/native';
import {addCat} from '../reduxToolkit/Slice5';
import {addData} from '../reduxToolkit/Slice';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {addCatNext} from '../reduxToolkit/Slice7';
var SQLite = require('react-native-sqlite-storage');
const db = SQLite.openDatabase({
  name: 'eFlashFrench.db',
  createFromLocation: 1,
});
import {
  GAMBannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';
import {Addsid} from './ads';
const NextScreen = ({route}) => {
  const navigation = useNavigation();
  const item = useSelector(state => state?.catdata);
  console.log('this is item', item);
  const disapatch = useDispatch();
  const cat = useSelector(state => state.cat);
  const wr = useSelector(state => state.question);
  console.log(cat);
  const muted = useSelector(state => state.sound);
  const getData = (cat, id) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbl_items WHERE Category=? ',
        [cat],
        (tx, results) => {
          console.log(' item query Query completed');
          let arr = [];
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            arr.push(row);
          }
          disapatch(addData(arr));
          disapatch(addCatNext({items: item.items, id: parseInt(id) + 1}));
          if (cat != 'link') {
            navigation.navigate(wr ? 'question' : 'details', {
              page: true,
              item: {items: item.items, id: parseInt(id) + 1},
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'home',
                },
              ],
            });
          }
        },
        err => {
          console.log(err);
        },
      );
    });
    console.log(cat, id);
  };

  const [mute, setMut] = useState(muted);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../Assets4/setting_screen.png')}>
        <Header onPress2={() => setMut(!mute)} mute={mute} />
        <View
          style={{
            top: '70%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{height: hp('9%'), width: hp('9%')}}
            onPress={() => {
              navigation.dispatch(StackActions.replace('details'));
            }}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../Assets4/btnrepeat_normal.png')}
            />
            <Text
              style={{
                fontSize: hp('2.7%'),
                fontWeight: 'bold',
                color: 'red',
                marginTop: '5%',
                elevation: 5,
              }}>
              Repeat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              getData(item.items[item.id - 1]?.Category, parseInt(item.id))
            }
            style={{height: hp('9%'), width: hp('9%')}}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../Assets4/btnnextcatg_normal.png')}
            />
            <Text
              style={{
                fontSize: hp('2.7%'),
                fontWeight: 'bold',
                color: 'red',
                marginTop: '5%',
                elevation: 5,
                alignSelf: 'center',
              }}>
              Next
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({index: 0, routes: [{name: 'home'}]})
            }
            style={{height: hp('9%'), width: hp('9%')}}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../Assets4/btnhome_normal.png')}
            />
            <Text
              style={{
                fontSize: hp('2.7%'),
                fontWeight: 'bold',
                color: 'red',
                marginTop: '5%',
                elevation: 5,
                alignSelf: 'center',
              }}>
              Home
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', bottom: 0}}>
          <GAMBannerAd
            unitId={Addsid.BANNER}
            sizes={[BannerAdSize.FULL_BANNER]}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default NextScreen;
