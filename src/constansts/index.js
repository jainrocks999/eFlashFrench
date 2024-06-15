import {Platform} from 'react-native';
const productSkus = Platform.select({
  android: ['in_ads_purchase'],
  ios: ['com.eflashapps.eflashfrench.proupgrade'],
});
export const constants = {
  productSkus,
};
