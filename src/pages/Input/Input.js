import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import NameModal from './NamesModal';
import BillsModal from './BillsModal';
import SettingsModal from './SettingsModal';

const Input = () => {
  return (
    <View style={styles.input}>
      <View style={styles.innerInputContainer}>
        <Text style={{ fontFamily: "Avenir Next", fontSize: 30 }}>Details</Text>
        <NameModal />
        <BillsModal />
        <SettingsModal />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerInputContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    height: '90%'
  },
  input: {
    alignItems: 'stretch',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
  },
});

export default Input;