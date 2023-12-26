import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  BackHandler,
  Alert,
  ScrollView,
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
      Alert.alert('This setting is disabled when quesion mode is enabled');
    } else {
      setToggleSwich(prev => ({...prev, [name]: !value}));
    }
  };
  const Save = async () => {
    updateSettings();
    dispatch(QuestionMode(questionMode));
    dispatch(addSetting(togleSwitch));
    if (pr === 'question') {
      if (!questionMode) {
        Navigation.dispatch(StackActions.replace('details'));
        dispatch({
          type: 'backSoundFromquestions/playWhenThePage',
          fromDetails: false,
          fromQuestion: false,
        });
      } else {
        await TrackPlayer.reset();
        Navigation.dispatch(StackActions.pop());
        dispatch({
          type: 'backSoundFromquestions/playWhenThePage',
          fromDetails: togleSwitch.Voice,
          fromQuestion: questionMode,
        });
      }
    } else if (pr === 'details') {
      if (questionMode) {
        Navigation.dispatch(StackActions.replace('question'));
        dispatch({
          type: 'backSoundFromquestions/playWhenThePage',
          fromDetails: false,
          fromQuestion: false,
        });
      } else {
        Navigation.dispatch(StackActions.pop());
        dispatch({
          type: 'backSoundFromquestions/playWhenThePage',
          fromDetails: togleSwitch.Voice,
          fromQuestion: questionMode,
        });
      }
    } else {
      Navigation.reset({index: 0, routes: [{name: 'home'}]});
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
  useEffect(() => {
    const backAction = async () => {
      await TrackPlayer.reset();
      if (pr == 'home') {
        Navigation.reset({index: 0, routes: [{name: 'home'}]});
      } else {
        dispatch({
          type: 'backSoundFromquestions/playWhenThePage',
          fromDetails: togleSwitch.Voice,
          fromQuestion: questionMode,
        });
        Navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../Assets4/setting_screen.png')}>
      <Header onPress2={() => setMute(!mute)} mute={mute} />
      <ScrollView>
        <View
          style={[
            styles.settingContainer,
            {marginTop: tablet ? '25%' : '32%'},
          ]}>
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
              if (pr == 'home') {
                Navigation.reset({index: 0, routes: [{name: 'home'}]});
              } else {
                await TrackPlayer.reset();
                dispatch({
                  type: 'backSoundFromquestions/playWhenThePage',
                  fromDetails: togleSwitch.Voice,
                  fromQuestion: quesion,
                });
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
      </ScrollView>
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
    height: height / 1.9,
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
