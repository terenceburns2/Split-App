import React, {useState} from 'react';
import {View, Text, TextInput, Modal, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons, Feather} from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import { changeBillType, setBroadbandBill, setStdWaterBill, setUsgWaterBill, setStdGEBill, setUsgGEBill} from '../../actions/actions';
import { connect } from 'react-redux';

  const BillInput = (props) => {
    if (props.store.billType == "Broadband") {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>Total</Text>
          <TextInput
            style={{width: '50%', borderColor: 'grey', borderWidth: 1, borderRadius: 5, padding: 5, marginTop: 10}}
            keyboardType='decimal-pad'
            value={props.store.broadbandBill}
            onChangeText={props.store.setBroadbandBill}
          />
        </View>
      );
    }
    else if (props.store.billType == "Gas/electric") {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>Usage charge</Text>
          <TextInput
            style={{width: '50%', borderColor: 'grey', borderWidth: 1, borderRadius: 5, padding: 5, marginTop: 10, marginBottom: 15}}
            keyboardType='decimal-pad'
            value={props.store.usgGEBill}
            onChangeText={props.store.setUsgGEBill}
          />
          <Text style={{fontSize: 15}}>Standard charge</Text>
          <TextInput
            style={{width: '50%', borderColor: 'grey', borderWidth: 1, borderRadius: 5, padding: 5, marginTop: 10}}
            keyboardType='decimal-pad'
            value={props.store.stdGEBill}
            onChangeText={props.store.setStdGEBill}
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
            value={props.store.usgWaterBill}
            onChangeText={props.store.setUsgWaterBill}
          />
          <Text style={{fontSize: 15}}>Standard charge</Text>
          <TextInput
            style={{width: '50%', borderColor: 'grey', borderWidth: 1, borderRadius: 5, padding: 5, marginTop: 10}}
            keyboardType='decimal-pad'
            value={props.store.stdWaterBill}
            onChangeText={props.store.setStdWaterBill}
          />
        </View>
      );
    }
  }

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
              <Text style={styles.modalTitle}>Bills</Text>
              <View>
                <Picker
                  selectedValue={props.billType}
                  onValueChange={(value, index) => props.change(value)}
                >
                  <Picker.Item label="Gas/electric" value="Gas/electric"/>
                  <Picker.Item label="Water" value="Water" />
                  <Picker.Item label="Broadband" value="Broadband" />
                </Picker>
              </View>
              
              <View style={{marginTop: -20}}>
                <BillInput 
                  store={props}
                />
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
          style={[styles.sectionButton, styles.bills]}
          onPress={() => setBillsModal(true)}
        >
        <Text style={styles.textStyle}>Bills</Text>
        <MaterialIcons name="attach-money" size={50} color="white" style={{paddingLeft: 60}}/>
        </Pressable>
    </>
    );
  }

  const styles = StyleSheet.create({
    bills: {
      backgroundColor: '#57A773',
    },
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      height: '61%',
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
      height: 200,
      borderRadius: 20,
      elevation: 2,
      backgroundColor: '#eb8634',
      fontFamily: "Avenir Next",
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      shadowColor: 'black',
      shadowOffset: {width: 3, height: 3},
      shadowOpacity: 0.5,
      shadowRadius: 3
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