/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
// import mobileAds, {MaxAdContentRating} from 'react-native-google-mobile-ads';

// mobileAds()
//   .setRequestConfiguration({
//     // Update all future requests suitable for parental guidance
//     maxAdContentRating: MaxAdContentRating.PG,

//     // Indicates that you want your content treated as child-directed for purposes of COPPA.
//     tagForChildDirectedTreatment: true,

//     // Indicates that you want the ad request to be handled in a
//     // manner suitable for users under the age of consent.
//     tagForUnderAgeOfConsent: true,

//     // An array of test device IDs to allow.
//     testDeviceIdentifiers: ['EMULATOR'],
//   })
//   .then(() => {
//     // Request config successfully set!
//   });

TrackPlayer.registerPlaybackService(() => require('./Service'));

AppRegistry.registerComponent(appName, () => App);
