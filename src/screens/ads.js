import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';
export const Addsid = {
  ...Platform.select({
    android: {
      BANNER: 'ca-app-pub-3339897183017333/1151216388',
      Interstitial: 'ca-app-pub-3339897183017333/8674483181',
    },
    ios:{
      BANNER:"ca-app-pub-3339897183017333/6918548388",
      Interstitial:"ca-app-pub-3339897183017333/7737334781"
    }
  })
};
