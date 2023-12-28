import {View, Text, Image} from 'react-native';
import React, {startTransition, useEffect} from 'react';
import {useNavigation, StackActions} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: 'home'}]});
    }, 2000);
  });
  return (
    <View style={{flex: 1, marginHorizontal: 1}}>
      <Image
        style={{height: '100%', width: '100%'}}
        source={require('../../Assets4/splash.png')}
      />
    </View>
  );
};

export default SplashScreen;
