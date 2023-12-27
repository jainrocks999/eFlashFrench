import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  AppState,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {height, width} from '../components/Diemenstions';
import {StyleSheet} from 'react-native';
import {setupPlayer} from '../components/Setup';
import TrackPlayer from 'react-native-track-player';
import {RightVOid, WrongVoid} from '../components/WrongVoid';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {addPagable} from '../reduxToolkit/Slicer6';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {isTablet} from 'react-native-device-info';
import {
  TestIds,
  InterstitialAd,
  AdEventType,
  GAMBannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import {Addsid} from './ads';
const authId = Addsid.Interstitial;
const requestOption = {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
};
const QuestionPage = props => {
  const interstitial = InterstitialAd.createForAdRequest(authId, requestOption);
  const tablet = isTablet();
  const backSound = useSelector(state => state.backSound);
  const disapatch = useDispatch();
  useEffect(() => {
    const backAction = async () => {
      await TrackPlayer.reset();
      navigation.reset({index: 0, routes: [{name: 'home'}]});
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const navigation = useNavigation();
  const canlable = useSelector(state => state.cancle);
  const page = useSelector(state => state.page);
  const [song, setSong] = useState();
  const [x, setX] = useState(0);
  const [count, setCount] = useState(1);
  const [wrong, setwrong] = useState([]);

  const data = useSelector(state => state.Items);
  const showAdd = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );
    interstitial.load();
    return unsubscribe;
  };

  const IsPlay = async (item, index) => {
    //  console.log('isPlay is fired')
    let isReady = await setupPlayer();
    await TrackPlayer.reset();
    setCount(count + 1);

    if (count > 8) {
      showAdd();
      setCount(0);
    }
    let arr = [
      (track = {
        url: require('../../asset2/clickon.mp3'), // Load media from the file system
        title: 'Ice Age',
        artist: 'deadmau5',

        duration: null,
      }),
      (track2 = {
        url: `asset:/files/${item.Sound.replace(/\s+/g, '_').trim()}`, // Load media from the file system
        title: 'Ice Age',
        artist: 'deadmau5',
        // Load artwork from the file system:
        //  artwork: require('../../asset2/clickon.mp3'),
        duration: null,
      }),
    ];
    if (isReady) {
      await TrackPlayer.add(arr);
      await TrackPlayer.play();
    }

    setSong(arr);
  };
  const [right, setRight] = useState([]);
  const [rendomdat, setrandomDat] = useState(data.slice(0, 4));
  const up = async indexx => {
    await TrackPlayer.reset();

    let traxck;
    let track2;
    let wrongnum = Math.floor(Math.random() * 4);
    WrongVoid.sort(() => Math.random() - 0.5).map((item, index) => {
      if (index == wrongnum) {
        traxck = item;
      }
    });
    let rightnum = Math.floor(Math.random() * 7);
    RightVOid.sort(() => Math.random() - 0.5).map((item, index) => {
      if (index == rightnum) {
        track2 = item;
      }
    });

    if (indexx === x) {
      setRight([x]);
      const arr = [0, 1, 2, 3].filter(item => item != x);
      setwrong(arr);
      await TrackPlayer.add(track2);
      setTimeout(() => {
        setRight([]);
        setwrong([]);
        const shuffledData = data
          .slice()
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);
        setrandomDat(shuffledData);
      }, 2000);
    } else {
      await TrackPlayer.add(traxck);
      switch (indexx) {
        case 0:
          setwrong([...wrong, 0]);
          break;
        case 1:
          setwrong([...wrong, 1]);
          break;
        case 2:
          setwrong([...wrong, 2]);
          break;
        case 3:
          setwrong([...wrong, 3]);
          break;
      }
    }

    await TrackPlayer.play();
  };

  useEffect(() => {
    run();
  }, [rendomdat]);

  const run = async () => {
    await TrackPlayer.reset();
    let y = Math.floor(Math.random() * 4);
    rendomdat.map((item, index) => {
      if (index === y) {
        IsPlay(item, index);
        setX(y);
      }
    });
  };

  useEffect(() => {
    backSound.fromQuestion
      ? setTimeout(() => {
          sound();
          disapatch({
            type: 'backSoundFromquestions/playWhenThePage',
            fromDetails: false,
            fromQuestion: false,
          });
        }, 500)
      : null;
  }, [backSound.fromQuestion == true]);

  const sound = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(song);
    await TrackPlayer.play();
  };

  const gotoSettings = async () => {
    await TrackPlayer.reset();
    disapatch({
      type: 'backSoundFromquestions/playWhenThePage',
      fromDetails: false,
      fromQuestion: false,
    });
    navigation.dispatch(StackActions.push('setting', {pr: 'question'}));
  };
  return (
    <View style={{height: '100%', width: '100%'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={async () => {
              await TrackPlayer.reset();
              disapatch(addPagable(false));
              navigation.reset({index: 0, routes: [{name: 'home'}]});
            }}>
            <Image
              style={styles.icon}
              source={require('../../Assets4/btnhome_normal.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sound()}>
            <Image
              style={styles.btn2}
              source={require('../../Assets4/btnrepeat_normal.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              gotoSettings();
            }}>
            <Image
              style={styles.icon}
              source={require('../../Assets4/btnsetting_normal.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: tablet ? '5%' : '5%',
            alignSelf: 'center',
            alignItems: 'center',
            paddingLeft: '2%',
          }}>
          <FlatList
            data={rendomdat}
            numColumns={2}
            keyExtractor={item => item['_id']}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    up(index);
                  }}
                  style={[!tablet ? styles.mobileView : styles.tabView]}>
                  <Image
                    style={{height: '100%', width: '100%'}}
                    source={{uri: `asset:/files/${item.Image}`}}
                    resizeMode="stretch"
                  />
                  {right.includes(index) ? (
                    <Image
                      style={[
                        {
                          position: 'absolute',
                          height: '100%',
                          width: '100%',
                        },
                      ]}
                      source={require('../../Assets4/rightselection.png')}
                      resizeMode="stretch"
                    />
                  ) : null}
                  {wrong.includes(index) ? (
                    <Image
                      style={[
                        {
                          position: 'absolute',
                          height: '100%',
                          width: '100%',
                          bottom: 15,
                        },
                      ]}
                      resizeMode="stretch"
                      source={require('../../Assets4/wrongselection.png')}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            }}
          />
        </View>
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
    </View>
  );
};

export default QuestionPage;
const styles = StyleSheet.create({
  icon: {
    height: hp(7),
    width: hp(7),
    margin: '1%',
  },
  Titel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  header: {
    height: height / 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
  },
  btn2: {
    height: hp(6.5),
    width: hp(6.5),
    alignSelf: 'center',
    marginTop: '15%',
  },
  wrongImg1: {
    height: hp(33),
    width: hp(24),
    marginHorizontal: wp(1.5),
    marginVertical: hp(3),
    // borderWidth: 4,
    alignItems: 'center',
  },
  wrongImg2: {
    height: hp(33),
    width: hp(24),
    marginHorizontal: wp(1.5),
    marginVertical: hp(3),
    // /  borderWidth: 4,
    alignItems: 'center',
  },
  worgImgContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
  },
  worgImgContainer2: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: hp(10),
  },
  mobileView: {
    height: hp(38),
    width: '46%',
    marginHorizontal: '1.5%',
    marginVertical: '1.5%',
  },
  tabView: {
    height: hp(38),
    width: hp(27),
    marginHorizontal: hp(1.5),
    // borderWidth: 4,
    marginVertical: hp(1),
  },
  tabWrong2: {
    height: hp(40),
    width: hp(29),
    marginLeft: hp(1),
    marginVertical: hp(1),
  },
  tabWrong1: {
    height: hp(40),
    width: hp(29),
    marginLeft: hp(4),
    marginVertical: hp(1),
  },
});
