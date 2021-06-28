import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CalculateBreakdown from './CalculateBreakdown';
import Breakdown from './Breakdown';

const Stack = createStackNavigator();

export default () => {
    return (
        <View style={styles.general}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        header: () => null
                    }}
                >
                    <Stack.Screen 
                        name="CalculateBreakdown" 
                        component={CalculateBreakdown}
                    />
                    <Stack.Screen name="Breakdown" component={Breakdown}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    
    );
}

const styles = StyleSheet.create({
    general: {
      height: Dimensions.get('window').height,
    }
});