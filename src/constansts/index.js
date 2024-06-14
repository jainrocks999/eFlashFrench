import {Platform} from 'react-native';
const productSkus = Platform.select({
  android: ['in_ads_purchase'],
});
export const constants = {
  productSkus,
};
