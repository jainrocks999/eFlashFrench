import {View, Text, AppState} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Detials from '../screens/Detials';
import QuestionPage from '../screens/QuestionPage';
import SettingScreen from '../screens/SettingScreen';
import SplashScreen from '../screens/SplashScreen';
import TrackPlayer from 'react-native-track-player';
import {setupPlayer} from './Setup';
import {useSelector, useDispatch} from 'react-redux';
import NextScreen from '../screens/NextScreen';
import InterstitialAdsScreen from '../screens/Adss';
const Stack = createStackNavigator();

const MyStack = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const mt = useSelector(state => state.sound);
  const disapatch = useDispatch();
  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('App has come to the foreground!');
  //     }

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     if (appState.current == 'background') {
  //       reste();
  //     } else if (appState.current == 'active') {
  //       play();
  //     }
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  const reste = async () => {
    await TrackPlayer.reset();
  };
  const play = async () => {
    isReady = await setupPlayer();
    await TrackPlayer.reset();
    let track = {
      url: require('../../asset2/babyflashtheme.mp3'), // Load media from the file system
      title: 'eFlashThem',
      artist: 'eFlashApps',
      // Load artwork from the file system:
      //artwork: `asset:/files/${item.Sound}`,
      duration: null,
    };
    if (isReady) {
      await TrackPlayer.add(track);
      mute && (await TrackPlayer.play());
    }

    dispatch(Sound(mute));
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="slash">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="details" component={Detials} />
        <Stack.Screen name="question" component={QuestionPage} />
        <Stack.Screen name="setting" component={SettingScreen} />
        <Stack.Screen name="slash" component={SplashScreen} />
        <Stack.Screen name="next" component={NextScreen} />
        {/* <Stack.Screen
          name="InterstitialAdsScreen"
          component={InterstitialAdsScreen}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
