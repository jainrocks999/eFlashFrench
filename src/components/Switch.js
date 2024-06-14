import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {isTablet} from 'react-native-device-info';
import {IAPContext} from '../Context';

const Switch = ({style, text, sw, onPress, ...props}) => {
  const {hasPurchased} = useContext(IAPContext);
  const [TogleSwitch, setTougleSwit] = useState(false);
  const Tablet = isTablet();
  return (
    <View style={{flexDirection: 'row', margin: '2%'}}>
      <View style={{width: '60%'}}>
        <Text style={style}>{text} :</Text>
      </View>
      <TouchableOpacity {...props} onPress={onPress} style={styles.pressable}>
        <Image
          style={
            Tablet
              ? {height: hasPurchased ? 50 : 40, width: hasPurchased ? 90 : 70}
              : {
                  height: hasPurchased ? 35 : 32,
                  width: hasPurchased ? 50 : 45,
                }
          }
          source={
            sw
              ? require('../../Assets4/on.png')
              : require('../../Assets4/off.png')
          }
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Switch;
const styles = StyleSheet.create({
  pressable: {
    // height:height*0.080,
    // width:width/3,
    // borderWidth:1,
    marginLeft: '1%',
  },
  pre: {
    height: 35,
    width: 60,
  },
});
