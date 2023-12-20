import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  BackHandler,
  Alert,
} from 'react-native';
import {height, width} from '../components/Diemenstions';
import React, {useEffect, useState} from 'react';
import Switch from '../components/Switch';
import {useDispatch, useSelector} from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import {QuestionMode} from '../reduxToolkit/Slice3';
import {addSetting} from '../reduxToolkit/Slice2';
import {StackActions, useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {addCancleble} from '../reduxToolkit/Slice5';
import {addPagable} from '../reduxToolkit/Slicer6';
var SQLite = require('react-native-sqlite-storage');
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const db = SQLite.openDatabase({
  name: 'eFlashFrench.db',
  createFromLocation: 1,
});
import {isTablet} from 'react-native-device-info';
import {
  TestIds,
  InterstitialAd,
  AdEventType,
  GAMBannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';
import {Addsid} from './ads';
const SettingScreen = props => {
  useEffect(() => {
    const backAction = async () => {
      await TrackPlayer.reset();
      Navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const muted = useSelector(state => state.sound);
  const canlable = useSelector(state => state.cancle);
  const tablet = isTablet();
  const pr = props.route.params.pr;
  const [mute, setMute] = useState(muted);
  const quesion = useSelector(state => state.question);
  const setting = useSelector(state => state.setting);
  console.log(quesion);
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const [togleSwitch, setToggleSwich] = useState({
    ActualVoice: setting.ActualVoice,
    English: setting.English,
    RandomOrder: setting.RandomOrder,
    Swipe: setting.Swipe,
    Videos: setting.Videos,
    Voice: setting.Voice,
  });
  const [questionMode, setquestion] = useState(quesion);
  const handleSwitch = (name, value) => {
    if (questionMode) {
      alert('This setting is disabled when quesion mode is enabled');
    } else {
      setToggleSwich(prev => ({...prev, [name]: !value}));
    }
  };
  const Save = async () => {
    updateSettings();
    dispatch(addSetting(togleSwitch));
    dispatch(QuestionMode(questionMode));

    if (pr === 'question') {
      if (!questionMode) {
        Navigation.dispatch(StackActions.replace('details'));
      } else {
        await TrackPlayer.reset();
        Navigation.dispatch(StackActions.pop());
      }
    } else if (pr === 'details') {
      if (questionMode) {
        Navigation.dispatch(StackActions.replace('question'));
      } else {
        Navigation.dispatch(StackActions.pop());
        console.log('else called');
      }
    } else {
      Navigation.goBack();
    }
    await TrackPlayer.reset();
  };
  //SELECT * FROM tbl_settings

  const updateSettings = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE  tbl_settings set ActualVoice=?,English=?,' +
          'Question=?,RandomOrder=?,Swipe=?,' +
          'Voice=? WHERE _id=1',
        [
          togleSwitch.ActualVoice,
          togleSwitch.English,
          questionMode,
          togleSwitch.RandomOrder,
          togleSwitch.Swipe,
          togleSwitch.Voice,
        ],
        (tx, results) => {
          console.log('Query completed');
        },
        err => {
          console.log(err);
          console.log('erorr');
        },
      );
    });
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../Assets4/setting_screen.png')}>
      <Header onPress2={() => setMute(!mute)} mute={mute} />
      <View
        style={[styles.settingContainer, {marginTop: tablet ? '25%' : '35%'}]}>
        <ImageBackground
          style={{flex: 1}}
          source={require('../../Assets4/settingpagebase.png')}>
          <View style={{marginTop: tablet ? '7%' : '10%', marginLeft: '5%'}}>
            <Switch
              text="Ouestion mode"
              style={styles.sw}
              onPress={() => {
                setquestion(!questionMode), setToggleSwich(pre => false);
              }}
              onFocus={() => {
                console.log('rrrj');
              }}
              sw={questionMode}
            />
            <Switch
              text="Voice"
              style={styles.tx}
              onPress={() => handleSwitch('Voice', togleSwitch.Voice)}
              sw={togleSwitch.Voice}
            />
            <Switch
              text="Sound"
              style={styles.tx}
              onPress={() =>
                handleSwitch('ActualVoice', togleSwitch.ActualVoice)
              }
              sw={togleSwitch.ActualVoice}
            />
            <Switch
              text="Rendom Order"
              style={styles.tx}
              onPress={() =>
                handleSwitch('RandomOrder', togleSwitch.RandomOrder)
              }
              sw={togleSwitch.RandomOrder}
            />
            <Switch
              text="Swipe"
              style={styles.tx}
              onPress={() => handleSwitch('Swipe', togleSwitch.Swipe)}
              sw={togleSwitch.Swipe}
            />
            <Switch
              text="English Text"
              style={styles.tx}
              onPress={() => handleSwitch('English', togleSwitch.English)}
              sw={togleSwitch.English}
            />
            {/* <Switch
              text="Video"
              style={styles.tx}
              onPress={() => {
                handleSwitch('Videos', false);
              }}
              sw={togleSwitch.Videos}
            /> */}
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: '10%',
        }}>
        <TouchableOpacity
          onPress={async () => {
            {
              dispatch(addPagable(true));
              await TrackPlayer.reset();
              dispatch(addCancleble(!canlable));
              Navigation.goBack();
            }
          }}>
          <Image
            style={{height: hp(6), width: wp(30)}}
            source={require('../../Assets4/btncancel_normal.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Save()}>
          <Image
            style={{height: hp(6), width: wp(30)}}
            source={require('../../Assets4/btnsave_normal.png')}
          />
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
  );
};

export default SettingScreen;
const styles = StyleSheet.create({
  settingContainer: {
    borderWidth: 2,
    marginTop: '40%',
    height: height / 1.8,
    margin: '5%',
  },
  sw: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    fontSize: wp(5),
    fontWeight: 'bold',
    color: 'black',
  },
  tx: {
    alignSelf: 'flex-end',
    marginRight: '5%',
    fontSize: wp(5),
    color: 'black',
  },
});
