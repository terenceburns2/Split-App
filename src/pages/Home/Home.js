import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native'

const Home = () => {
    return (
    <View style={styles.home}>
      <Text style={styles.title}>Split</Text>
      <Text style={styles.subheading}>Swipe up to begin.</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    home: {
      backgroundColor: '#FF7547',
      alignItems: 'center',
      justifyContent: 'center',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
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

export default Home;