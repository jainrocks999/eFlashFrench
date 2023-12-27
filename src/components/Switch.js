import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';

import {isTablet} from 'react-native-device-info';
const Switch = ({style, text, sw, onPress, ...props}) => {
  const [TogleSwitch, setTougleSwit] = useState(false);
  const Tablet = isTablet();
  return (
    <View style={{flexDirection: 'row', margin: '2%'}}>
      <View style={{width: '60%'}}>
        <Text style={style}>{text} :</Text>
      </View>
      <TouchableOpacity {...props} onPress={onPress} style={styles.pressable}>
        <Image
          style={Tablet ? {height: 50, width: 90} : styles.pre}
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
