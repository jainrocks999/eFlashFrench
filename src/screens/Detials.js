import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
  FileSystem,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {height, width} from '../components/Diemenstions';
import TrackPlayer from 'react-native-track-player';
import {setupPlayer} from '../components/Setup';
import GestureRecognizer from 'react-native-swipe-gestures';
import {StackActions, useNavigation} from '@react-navigation/native';
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

const adUnit = Addsid.Interstitial;
const requestOption = {
  requestNonPersonalizedAdsOnly: true,
  // keywords: ['fashion', 'clothing'],
};
const Detials = props => {
  const tablet = isTablet();
  const disapatch = useDispatch();
  const canlable = useSelector(state => state.cancle);
  const page = useSelector(state => state.page);
  const interstitial = InterstitialAd.createForAdRequest(adUnit, requestOption);
  useEffect(() => {
    const backAction = async () => {
      await TrackPlayer.reset();
      disapatch(addPagable(false));

      navigation.dispatch(StackActions.popToTop());
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const [Images, setImages] = useState('');
  const [Title, setTitle] = useState();
  const [count, setCount] = useState(0);
  const [Music, setMusic] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, [count]);

  const setting = useSelector(state => state.setting);

  const data = useSelector(state => state.Items);

  const getAdd = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );
    interstitial.load();
    return unsubscribe;
  };
  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  let newData;

  if (setting.RandomOrder) {
    const shuffledData = shuffle([...data]);
    newData = [...shuffledData];
  } else {
    newData =
      data[0].Category != 'Numbers'
        ? [...data]?.sort((a, b) => {
            const titleA = a.Title.toUpperCase();
            const titleB = b.Title.toUpperCase();

            if (titleA < titleB) {
              return -1;
            }
            if (titleA > titleB) {
              return 1;
            }
            return 0;
          })
        : [...data].sort();
  }

  const getData = async () => {
    let isSetup = await setupPlayer();
    await TrackPlayer.reset();
    let Imagess;
    let Titel;
    let track;
    let track2;
    let ActualSound;
    const numbers = [6, 9, 5, 8, 12];
    const indexx = Math.floor(Math.random() * numbers.length);
    let y = data.length;
    if (count >= 0 && count <= y - 1) {
      newData.map(async (item, index) => {
        if (index == count) {
          Titel = item.Title;
          console.log(item.Sound);
          Imagess = `asset:/files/${item.Image.replace(/\s+/g, ' ')
            .trim()
            .toLowerCase()}`;
          console.log('this issome', Imagess);
          track = {
            url: `asset:/files/${item.Sound.replace(/\s+/g, '_').trim()}`, // Load media from the file system
            title: 'Ice Age',
            artist: 'deadmau5',
            // Load artwork from the file system:
            artwork: `asset:/files/${item.Sound.replace(/\s+/g, '_').trim()}`,
            duration: null,
          };
          track2 = {
            url: `asset:/files/${item.ActualSound.replace(/-/g, '_').trim()}`, // Load media from the file system
            title: 'Ice Age',
            artist: 'deadmau5',
            // Load artwork from the file system:
            artwork: `asset:/files/${item.Sound}`,
            duration: null,
          };
          ActualSound = item.ActualSound.replace(/-/g, '_').trim();
        }
      });
    } else if (count < 0) {
      navigation.goBack();
    } else {
      getAdd();
      navigation.dispatch(StackActions.replace('next'));
    }

    setTitle(Titel);
    setImages(Imagess);
    if (ActualSound?.length > 0 && setting.ActualVoice && setting.Voice) {
      setMusic([track2, track]);
    } else if (ActualSound && setting.ActualVoice) {
      setMusic(track2);
    } else {
      setMusic(track);
    }
    console.log('this is actusl sound', ActualSound);
    if (isSetup) {
      if (ActualSound != '' && setting.ActualVoice && setting.Voice) {
        await TrackPlayer.add([track2, track]);
      } else if (ActualSound != '' && setting.ActualVoice) {
        await TrackPlayer.add(track2);
      } else if (setting.Voice) {
        await TrackPlayer.add(track);
      }
    }
    await TrackPlayer.play();
  };

  useEffect(() => {
    page ? paly() : null;
  }, [canlable]);
  const paly = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add(Music);
    await TrackPlayer.play();
  };

  return (
    <GestureRecognizer
      style={{flex: 1}}
      onSwipeLeft={() => setting.Swipe && setCount(count + 1)}
      onSwipeRight={() => setting.Swipe && setCount(count - 1)}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={async () => {
              await TrackPlayer.reset();
              disapatch(addPagable(false));
              navigation.dispatch(StackActions.popToTop());
            }}>
            <Image
              style={styles.icon}
              source={require('../../Assets4/btnhome_normal.png')}
            />
          </TouchableOpacity>
          <Text style={styles.Titel}>{setting.English && Title}</Text>
          <TouchableOpacity
            onPress={async () => {
              await TrackPlayer.reset();
              disapatch(addPagable(false));
              navigation.dispatch(
                StackActions.push('setting', {pr: 'details'}),
              );
            }}>
            <Image
              style={styles.icon}
              source={require('../../Assets4/btnsetting_normal.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imgContainer}>
          {Images && (
            <Image
              style={{
                height: height / 1.45,
                width: '100%',
                alignItems: 'center',
              }}
              source={{
                uri: Images,
                //asset:/files/${'b'.replace(/\s+/g, ' ').trim()}.png
              }}
            />
          )}
        </View>
        <View style={styles.btnContainer}>
          {!setting.Swipe && (
            <TouchableOpacity
              onPress={async () => {
                setCount(count - 1);
              }}>
              <Image
                style={[
                  styles.btn,
                  {
                    height: tablet ? hp(6) : hp(5.6),
                    width: tablet ? wp(31) : wp(35),
                  },
                ]}
                source={require('../../Assets4/btnprevious_normal.png')}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              paly();
            }}>
            <Image
              style={[styles.btn2, setting.Swipe && {marginLeft: '60%'}]}
              source={require('../../Assets4/btnrepeat_normal.png')}
            />
          </TouchableOpacity>
          {!setting.Swipe && (
            <TouchableOpacity
              onPress={async () => {
                setCount(count + 1);
              }}>
              <Image
                style={[
                  styles.btn,
                  {
                    height: tablet ? hp(6) : hp(5.6),
                    width: tablet ? wp(31) : wp(35),
                  },
                ]}
                source={require('../../Assets4/btnnext_normal.png')}
              />
            </TouchableOpacity>
          )}
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
    </GestureRecognizer>
  );
};

export default Detials;

const styles = StyleSheet.create({
  header: {
    height: height / 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
    paddingHorizontal: wp(2),
  },
  icon: {
    height: hp(7),
    width: hp(7),
    margin: 5,
  },
  Titel: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  imgContainer: {
    height: height,
    marginTop: '5%',
    // marginLeft: 8,
  },
  btnContainer: {
    position: 'absolute',
    bottom: '9%',
    width: '98%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(1.5),
    alignSelf: 'center',
    alignItems: 'center',
  },
  btn: {
    height: hp(5.5),
    width: wp(35),
    margin: '1%',
  },
  btn2: {
    height: hp(6.5),
    width: hp(6.5),
    margin: '1%',
  },
});
['zaju', 'bazu', 'sazu', 'raju'];
