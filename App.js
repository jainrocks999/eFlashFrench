import {
  StyleSheet,
  AppState,
  Alert,
  BackHandler,
  StatusBar,
  LogBox,
  View,
  Button,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import MyStack from './src/components/MyStack';
import {Provider} from 'react-redux';
import myStore from './src/reduxToolkit/MyStore';
import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
import {Addsid} from './src/screens/ads';
import IAPProvider from './src/Context';

const App = () => {
  LogBox.ignoreAllLogs();
  const appState = useRef(AppState.currentState);
  const interstitial = InterstitialAd.createForAdRequest(Addsid.Interstitial, {
    requestNonPersonalizedAdsOnly: true,
  });

  const showAdd = () => {
    // const unsubscribe = interstitial.addAdEventListener(
    //   AdEventType.LOADED,
    //   () => {
    //     interstitial.show();
    //     setCount(2);
    //   },
    // );
    // interstitial.load();
    // return unsubscribe;
  };
  const [appStateVisible, setAppStateVisible] = useState(false);
  const [count, setCount] = useState(1);
  const handleAppStateChange = nextState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextState == 'active'
    ) {
      setAppStateVisible(true);
    }
    appState.current = nextState;
    if (appState.current == 'background') {
    }
  };
  useEffect(() => {
    const unsubscribe = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => unsubscribe.remove();
  }, []);
  useEffect(() => {
    if (appStateVisible) showAdd();
  }, [appStateVisible]);

  function handleBackButtonClick() {
    // showAdd1();

    return true;
  }

  const showAdd1 = () => {
    try {
      const unsubscribe = interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          interstitial.show();
          BackHandler.exitApp();
        },
      );
      interstitial.load();
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <IAPProvider>
      <Provider store={myStore}>
        <StatusBar backgroundColor="#73cbea" />
        <MyStack />
      </Provider>
    </IAPProvider>  
    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //   <Button
    //     onPress={() => {
    //       requestPurchases(constants.productSkus);
    //     }}
    //     title="purchase"
    //   />
    // </View>
  );
};

export default App;

const styles = StyleSheet.create({});
