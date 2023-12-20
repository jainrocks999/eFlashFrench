import {StyleSheet, Text, View, AppState} from 'react-native';
import React, {useEffect} from 'react';
import MyStack from './components/MyStack';

import myStore from './reduxToolkit/MyStore';
import TrackPlayer from 'react-native-track-player';

const Root = () => {
  return <MyStack />;
};

export default Root;

const styles = StyleSheet.create({});
//ca-app-pub-3339897183017333~5721016782
