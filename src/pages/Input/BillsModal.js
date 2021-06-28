import React, {useState} from 'react';
import {View, Text, TextInput, Modal, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons, Feather} from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import { changeBillType, setBroadbandBill, setStdWaterBill, setUsgWaterBill, setStdGEBill, setUsgGEBill} from '../../actions/actions';
import { connect } from 'react-redux';

  // This is used to conditionally render the views with respect to the bill type.
  // The props used here are dervied from the global store.
  const BillInput = (props) => {
    // Validate the usage/standard bill cost input.
    const validateInput = (value) => {
      let regex = /^\d+(?:\.\d{0,2})$/;
      if (regex.test(value))
        return true;
      return false;
    }

    if (props.billType == "Broadband") {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>Total</Text>
          <TextInput
            style={{width: '50%', borderColor: 'grey', borderWidth: 1, borderRadius: 5, padding: 5, marginTop: 10}}
            keyboardType='decimal-pad'
            onChangeText={props.setBroadbandBill}
            onEndEditing={(e) => {
              if (validateInput(e.nativeEvent.text)) {
                props.setBroadbandBill(e.nativeEvent.text);
              } else {
                props.setBroadbandBill("0.00");
              }
            }}
            value={props.broadbandBill}
          />
        </View>
      );
    }
    else if (props.billType == "Gas/electric") {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>Usage charge</Text>
          <TextInput
            style={{width: '50%', borderColor: 'grey', borderWidth: 1, borderRadius: 5, padding: 5, marginTop: 10, marginBottom: 15}}
            keyboardType='decimal-pad'
            onChangeText={props.setUsgGEBill}
            onEndEditing={(e) => {
              if (validateInput(e.nativeEvent.text)) {
                props.setUsgGEBill(e.nativeEvent.text);
              } else {
                props.setUsgGEBill("0.00");
              }
            }}
            value={props.usgGEBill}
          />
          <Text style={{fontSize: 15}}>Standard charge</Text>
          <TextInput
            style={{width: '50%', borderColor: 'grey', borderWidth: 1, borderRadius: 5, padding: 5, marginTop: 10}}
            keyboardType='decimal-pad'
            onChangeText={props.setStdGEBill}
            onEndEditing={(e) => {
              if (validateInput(e.nativeEvent.text)) {
                props.setStdGEBill(e.nativeEvent.text);
              } else {
                props.setStdGEBill("0.00");
              }
            }}
            value={props.stdGEBill}
          />
        </View>
      );
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>Usage charge</Text>
          <TextInput
            style={{width: '50%', borderColor: 'grey', borderWidth: 1, borderRadius: 5, padding: 5, marginTop: 10, marginBottom: 15}}
            keyboardType='decimal-pad'
            onChangeText={props.setUsgWaterBill}
            onEndEditing={(e) => {
              if (validateInput(e.nativeEvent.text)) {
                props.setUsgWaterBill(e.nativeEvent.text);
              } else {
                props.setUsgWaterBill("0.00");
              }
            }}
            value={props.usgWaterBill}
          />
          <Text style={{fontSize: 15}}>Standard charge</Text>
          <TextInput
            style={{width: '50%', borderColor: 'grey', borderWidth: 1, borderRadius: 5, padding: 5, marginTop: 10}}
            keyboardType='decimal-pad'
            onChangeText={props.setStdWaterBill}
            onEndEditing={(e) => {
              if (validateInput(e.nativeEvent.text)) {
                props.setStdWaterBill(e.nativeEvent.text);
              } else {
                props.setStdWaterBill("0.00");
              }
            }}
            value={props.stdWaterBill}
          />
        </View>
      );
    }
  }

  // Main component rendering the views with respect to the output of the conditional render above.
  const BillsModal = (props) => {
    const [billsModal, setBillsModal] = useState(false);  

    return (
    <>
       <Modal
          animationType="fade"
          transparent={true}
          visible={billsModal}
          onRequestClose={() => {
            setBillsModal(!billsModal);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.input}>
                <Text style={styles.modalTitle}>Bills</Text>
                <View style={{flex: 1}}>
                  <Picker
                    selectedValue={props.billType}
                    onValueChange={(value, index) => props.change(value)}
                  >
                    <Picker.Item label="Gas/electric" value="Gas/electric"/>
                    <Picker.Item label="Water" value="Water" />
                    <Picker.Item label="Broadband" value="Broadband" />
                  </Picker>
                </View>
                <View style={{flex:1, justifyContent: 'flex-start'}}>
                  <BillInput 
                    billType={props.billType}
                    broadbandBill={props.broadbandBill}
                    stdGEBill={props.stdGEBill}
                    stdWaterBill={props.stdWaterBill}
                    usgGEBill={props.usgGEBill}
                    usgWaterBill={props.usgWaterBill}
                    setBroadbandBill={props.setBroadbandBill}
                    setStdGEBill={props.setStdGEBill}
                    setStdWaterBill={props.setStdWaterBill}
                    setUsgGEBill={props.setUsgGEBill}
                    setUsgWaterBill={props.setUsgWaterBill}
                  />
                </View>
              </View>
              <View style={{flex:1, justifyContent:'flex-end'}}>
                  <Pressable
                    onPress={() => setBillsModal(!billsModal)}
                    style={{alignSelf: 'center'}}
                  >
                    <Feather name="check-circle" size={40} color="green" />
                  </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
          style={styles.sectionButton}
          onPress={() => setBillsModal(true)}
        >
        <Text style={styles.textStyle}>Bills</Text>
        <MaterialIcons name="attach-money" size={50} color="white" style={{paddingLeft: 60}}/>
        </Pressable>
    </>
    );
  }

  const styles = StyleSheet.create({
    input: {
      flex: 7
    },
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 30
    },
    modalContent: {
      flex: 1,
      width: '85%',
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      textAlign: "center",
      fontFamily: "Avenir Next", 
      fontSize: 20
    },
    sectionButton: {
      flex: 1,
      marginVertical: 15,
      borderRadius: 20,
      elevation: 2,
      fontFamily: "Avenir Next",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      shadowColor: 'black',
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      backgroundColor: '#25A5D0'
    },   
    textStyle: {
      color: "white",
      fontFamily: "Avenir Next",
      textAlign: "center",
      fontSize: 20,
      padding: 5
    },
  });


  const mapStateToProps = (state) => {
    return {
      billType: state.billType,
      broadbandBill: state.broadbandBill,
      usgWaterBill: state.usgWaterBill,
      stdWaterBill: state.stdWaterBill,
      usgGEBill: state.usgGEBill,
      stdGEBill: state.stdGEBill,
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      change: (bill) => dispatch(changeBillType(bill)),
      setBroadbandBill: (value) => dispatch(setBroadbandBill(value)),
      setStdWaterBill: (value) => dispatch(setStdWaterBill(value)),
      setUsgWaterBill: (value) => dispatch(setUsgWaterBill(value)),
      setStdGEBill: (value) => dispatch(setStdGEBill(value)),
      setUsgGEBill: (value) => dispatch(setUsgGEBill(value)),
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BillsModal);