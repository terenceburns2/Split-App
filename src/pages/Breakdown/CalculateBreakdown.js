import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, Animated, Pressable, Image, Alert} from 'react-native';
import { connect } from 'react-redux';

// Contained with the navigation container in BreakdownNav, this present the screen prior
// to the breakdown details of the bill split. 
const CalculateBreakdown = (props) => {
  const transform = useRef(
    new Animated.Value(1)
  ).current;

  // Bouncing effect of the button.
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(transform, {
          toValue: 1.05,
          duration: 500,
          delay: 200,
          useNativeDriver: true
        }),
        Animated.timing(transform, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        })
      ]), {useNativeDriver: true}
    ).start()});

    const validateBillInput = () => {
      switch (props.billType) {
        case "Broadband":
          if (props.broadbandBill == "0")
            return "Please input the total cost of your broadband bill.\n\n";
          else
            return "";
        case "Gas/electric":
          if (props.stdGEBill == "0" || props.usgGEBill == "0")
            return "Please provide both usage and standard costs of your gas/electric bill.\n\n";
          else
            return "";
        case "Water":
          if (props.stdWaterBill == "0" || props.usgGEBill == "0")
            return "Please provide both usage and standard costs of your water bill.\n\n";
          else
            return "";
      }
    }

    const validateDateInput = () => {
      if (props.dateOfBill == "")
        return "Please provide the date range of the bill.\n\n";
      else 
        return "";  
    }

    const validateHousemates = () => {
      if (props.housemates.length == 0) 
        return "Please provide your housemate's names.\n\n";
      else 
        return "";
    }

    const handlePress = () => {
      let valid = "";            
      valid = validateBillInput();
      valid += validateDateInput();
      valid += validateHousemates();
      
      if (valid == "") {
        props.navigation.push('Breakdown')
      } else {
        Alert.alert(
          "All input fields must be filled",
          valid,
          [
            {text: "OK", onPress: () => {}}
          ]
        );
      } 
    }

  return (
    <View style={styles.general}>
        <Text
          style={{fontFamily: "Avenir Next", fontSize: 30, marginBottom: 50}}
        >
          Split the bill! 
        </Text>
        <Image
          style={styles.image}
          source={require('../../assets/people.jpg')}
        />
        <Pressable
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={handlePress}
        >
          <Animated.View
            style={[styles.button, {transform: [{scale: transform}]}]}
            title="Calculate"
          > 
            <Text style={{color: 'white'}}>Calculate!</Text>
          </Animated.View> 
        </Pressable>
    </View> 
  );
}

const styles = StyleSheet.create({
    button: {
      width: 250,
      height: 40,
      borderRadius: 100,
      elevation: 1,
      fontFamily: "Avenir Next",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF7547',
      shadowOffset: {width: 2, height: 2},
      shadowColor: 'black',
      shadowRadius: 3,
      shadowOpacity: 0.2
    },
    general: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      height: Dimensions.get('window').height
    },
    image: {
      width: 410,
      height: 310
    },
    subheading: {
      fontSize: 17,
      opacity: 0.4
    }
});

const mapPropsToState = (state) => {
  return {
    broadbandBill: state.broadbandBill,
    billType: state.billType,
    dateOfBill: state.dateOfBill,
    durationOfBill: state.durationOfBill,
    housemates: state.housemates,
    splitOption: state.splitOption,
    stdGEBill: state.stdGEBill,
    stdWaterBill: state.stdWaterBill,
    usgGEBill: state.usgGEBill,
    usgWaterBill: state.usgWaterBill
  }
}

export default connect(mapPropsToState, null)(CalculateBreakdown);