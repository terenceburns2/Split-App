import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native'


const Breakdown = () => {
  return (
    <View style={styles.general}>
      <Text style={styles.title}>Breakdown</Text>
      <Text style={styles.subheading}>This will show the calculated split between housemates.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    general: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      height: Dimensions.get('window').height
    },
    subheading: {
      fontSize: 17,
      opacity: 0.4
    },
    title: {
      fontSize: 70,
      color: 'white',
      fontFamily: "Avenir Next",
    }   
});

export default Breakdown;