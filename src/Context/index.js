import React, {createContext, useState, useEffect} from 'react';
import * as RNIap from 'react-native-iap';
import {constants} from '../constansts';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const IAPContext = createContext();

const IAPProvider = ({children}) => {
  const [hasPurchased, setHasPurchased] = useState(false);
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getISPurchased();
  }, []);
  const getISPurchased = async () => {
    const purchase = await AsyncStorage.getItem('IN_APP_PURCHASE');
    if (purchase === constants.productSkus[0]) {
      setHasPurchased(true);
    } else {
      setHasPurchased(false);
    }
  };
  const checkPurchases = async bool => {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      const premium = purchases.some(
        purchase => purchase.productId === constants.productSkus[0],
      );

      if (premium) {
        await AsyncStorage.setItem('IN_APP_PURCHASE', constants.productSkus[0]);
        setHasPurchased(true);
        setVisible(false);

        if (bool) {
          Alert.alert(
            'Purchase Restored',
            'Your purchase has been successfully restored.',
            [{text: 'OK'}],
          );
        }
      } else {
        await AsyncStorage.removeItem('IN_APP_PURCHASE');
        setHasPurchased(false);
        if (bool) {
          Alert.alert(
            'No Purchase Found',
            'You do not have any purchases. Would you like to make a purchase?',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  setVisible(false);
                },
                style: 'cancel',
              },
              {text: 'Purchase', onPress: () => requestPurchase()}, // Implement your purchase logic in handlePurchase function
            ],
            {cancelable: false},
          );
        }
      }
    } catch (error) {
      console.error('Error checking purchases: ', error);
    }
  };
  useEffect(() => {
    const purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async purchase => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            await RNIap.finishTransaction({purchase, isConsumable: false});
            Alert.alert(
              'Completed',
              'The Transcation has been completed successfully',
            );
            checkPurchases(false);
            setVisible(false);
          } catch (error) {
            console.error(
              'An error occurred while completing transaction',
              error,
            );
          }
        }
      },
    );

    const purchaseErrorSubscription = RNIap.purchaseErrorListener(error => {
      setVisible(false);
      console.log(error);
    });

    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const initIAP = async () => {
      try {
        await RNIap.initConnection();
        const availableProducts = await RNIap.getProducts({
          skus: constants.productSkus,
        });
        setProducts(availableProducts);
      } catch (error) {
        console.warn('Error during IAP initialization', error);
      }
    };

    initIAP();

    return () => {
      RNIap.endConnection();
    };
  }, []);
  const requestPurchase = async () => {
    try {
      const pucrs = await RNIap.requestPurchase({skus: constants.productSkus});
    } catch (error) {
      Alert.alert('Message', error.message);
    }
  };

  return (
    <IAPContext.Provider
      value={{
        hasPurchased,
        products,
        requestPurchase,
        checkPurchases,
        visible,
        setVisible,
      }}>
      {children}
    </IAPContext.Provider>
  );
};

export default IAPProvider;
