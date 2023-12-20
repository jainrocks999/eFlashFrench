import {Image, StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import {height, width} from './Diemenstions';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {isTablet} from 'react-native-device-info';

const Card = ({item, onPress}) => {
  //const path = require('../../assets/1.jpg')
  const tablet = isTablet();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        item?.Category == 'link' || item?.Category == 'link2'
          ? {height: tablet ? hp(28) : hp(22), width: wp(45)}
          : {height: tablet ? hp(25) : hp(20)},
      ]}
      activeOpacity={0.8}>
      <Image
        style={{height: '100%', width: '100%', resizeMode: 'cover'}}
        source={item.Image}
      />
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    // borderWidth:1,
    height: hp(20),
    width: wp(45),
    margin: '2%',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
