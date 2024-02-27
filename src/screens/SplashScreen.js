import {View, Text, Image} from 'react-native';
import React, {startTransition, useEffect} from 'react';
import {useNavigation, StackActions} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: 'home'}]});
    }, 2000);
  });
  return (
    <SafeAreaView
      style={{flex: 1, marginHorizontal: 1, backgroundColor: '#d7f4ff'}}>
      <Image
        style={{height: '100%', width: '100%'}}
        source={require('../../Assets4/splash.png')}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
