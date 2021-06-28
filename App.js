import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, } from 'react-native'
import { Home, Input, BreakdownNav } from './src/pages'
import { Provider } from 'react-redux';
import configureStore from './src/store';

// Intiate global store.
// We pass this into Provider, which makes the store available to any nested components.
const store = configureStore();

export default function App() {

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <ScrollView
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          snapToInterval={Dimensions.get('window').height}
        >
          <Home />
          <Input />
          <BreakdownNav />
        </ScrollView>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



