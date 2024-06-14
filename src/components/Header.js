import {View, Text, Image, TouchableOpacity, AppState} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {height, width} from './Diemenstions';
import TrackPlayer from 'react-native-track-player';
import {setupPlayer} from './Setup';
import {useDispatch, useSelector} from 'react-redux';
import {Sound} from '../reduxToolkit/Slice4';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Header = ({
  onPress,
  onPress2,
  onPressPuchase,
  mute,
  hasPurchased,
  home,
}) => {
  const mt = useSelector(state => state.sound);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    play();
  }, [mute]);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
      }

      appState.current = nextAppState;
      if (appState.current == 'background') {
        console.log('ap is ogone to backgoumnd');
      }
      setAppStateVisible(appState.current);
      if (appState.current == 'background') {
        reset();
      } else if (appState.current == 'active') {
        // play();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const reset = async () => {
    await TrackPlayer.reset();
  };
  const play = async () => {
    isReady = await setupPlayer();
    await TrackPlayer.reset();
    let track = {
      url: require('../../asset2/babyflashtheme.mp3'), // Load media from the file system
      title: 'eFlashThem',
      artist: 'eflashApps',
      duration: null,
    };
    if (isReady) {
      await TrackPlayer.add(track);
      mute ? await TrackPlayer.play() : await TrackPlayer.reset();
    }

    dispatch(Sound(mute));
  };

  return (
    <View
      style={{
        height: height / 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(2),
        marginTop: hp(0.5),
      }}>
      <TouchableOpacity onPress={onPress2}>
        <Image
          style={{height: hp(7), width: hp(7)}}
          source={
            mt
              ? require('../../Assets4/btnsseakar.png')
              : require('../../Assets4/btnspeakarcancel.png')
          }
          resizeMode="contain"
        />
      </TouchableOpacity>
      {!hasPurchased && home ? (
        <TouchableOpacity
          onPress={onPressPuchase}
          style={{height: '80%', width: '60%'}}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={require('../../Assets4/upgrade.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}
      {home && (
        <TouchableOpacity onPress={onPress}>
          <Image
            style={{height: hp(7), width: hp(7)}}
            source={require('../../Assets4/btnsetting_normal.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
