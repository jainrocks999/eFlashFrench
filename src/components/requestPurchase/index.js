import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const PurcahsdeModal = ({onClose, onRestore, visible, onPress}) => {
  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Enjoy an Ad-Free Experience with Multi-tasking!
          </Text>
          <Text style={[styles.modalText1, {fontSize: 14, fontWeight: '700'}]}>
            Get Ad-Free version for absolutely un-interrupted Play and learn
            experience for your child!
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => onClose(false)}>
              <Text style={styles.textStyle}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPress(false)}
              style={[styles.button, styles.buttonClose]}>
              <Text style={styles.textStyle}>Yes, Please</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => onRestore()}
            style={[
              ,
              styles.buttonClose,
              {
                width: '97%',
                borderRadius: 10,
                borderWidth: 5,
                paddingHorizontal: 10,
                paddingVertical: 10,
                justifyContent: 'center',
                elevation: 2,
                height: 50,
                marginHorizontal: 30,
              },
            ]}>
            <Text style={styles.textStyle}>Restore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PurcahsdeModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    marginHorizontal: 30,
    backgroundColor: 'black',
    padding: 20,
    width: '95%',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    borderWidth: 5,
    paddingHorizontal: 40,
    paddingVertical: 10,
    justifyContent: 'center',
    elevation: 2,
    height: 50,
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: 'green',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  modalText1: {
    textAlign: 'center',
    color: 'white',
    marginVertical: 5,
  },
});
