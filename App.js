import React from 'react';
import {View, StyleSheet, Dimensions, ScrollView,} from 'react-native'
import {Home, Input, Breakdown} from './src/pages'

export default function App() {
  return (
    <View style={styles.container}>
        <ScrollView
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get('window').height}
          >
          <Home/>
          <Input/>
          <Breakdown/>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});



