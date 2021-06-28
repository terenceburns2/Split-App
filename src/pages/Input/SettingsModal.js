import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Switch, FlatList, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import NameCardWithDays from './components/NameCardWithDays.js';
import { connect } from 'react-redux';
import { setSplitOption, setDurationOfBill, setDateOfBill } from '../../actions/actions';
import DateTimePicker from 'react-native-modal-datetime-picker';

// A Component that handles the conditional render of whether the name card displayed
// should have the option of inputting the number of days the housemate was present, based
// on whether the user selects to split by usuage.
const DateSelection = (props) => {
  const [isFromDPVisible, setFromDPVisibility] = useState(false);
  const [isToDPVisible, setToDPVisibility] = useState(false);

  useEffect(() => {
    // Format date string
    const dateString = props.from.toLocaleDateString() + ' - ' + props.to.toLocaleDateString();
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(props.from.getFullYear(), props.from.getMonth(), props.from.getDate());
    const utc2 = Date.UTC(props.to.getFullYear(), props.to.getMonth(), props.to.getDate());
    const days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    props.store.setDurationOfBill(days);
    props.store.setDateOfBill(dateString);
  }, [props.from, props.to])

  const handleFromConfirm = (date) => {
    props.setFrom(date);
    setFromDPVisibility(false);
  };

  const handleToConfirm = (date) => {
    props.setTo(date);
    setToDPVisibility(false);
  };

  if (props.store.splitOption == true) {
    return (
      <View style={styles.splitOuterContainer}>
        <View style={styles.splitInnerContent}>
          <TouchableOpacity onPress={() => setFromDPVisibility(true)} style={{ flex: 1, height: 35, marginRight: 20, borderWidth: 0.8, borderColor: 'grey', borderRadius: 10, padding: 8 }}>
            <Text style={styles.dateText}>{'From:' + ' ' + props.from.toDateString().slice(4, props.from.length)}</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={isFromDPVisible}
            mode="date"
            onConfirm={handleFromConfirm}
            onCancel={() => setFromDPVisibility(false)}
          />
          <TouchableOpacity onPress={() => setToDPVisibility(true)} style={{ flex: 1, height: 35, borderWidth: 0.8, borderColor: 'grey', borderRadius: 10, padding: 8 }}>
            <Text style={styles.dateText}>{'To:' + ' ' + props.to.toDateString().slice(4, props.to.length)}</Text>
          </TouchableOpacity>
          <DateTimePicker
            minimumDate={props.from}
            isVisible={isToDPVisible}
            mode="date"
            onConfirm={handleToConfirm}
            onCancel={() => setToDPVisibility(false)}
          />
        </View>
        <FlatList
          style={styles.flatlist}
          data={props.store.housemates}
          renderItem={({ item }) => (
            <NameCardWithDays item={item}/>
          )}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.splitOuterContainer}>
        <View style={styles.splitInnerContent}>
          <TouchableOpacity onPress={() => setFromDPVisibility(true)} style={{ flex: 1, height: 35, marginRight: 20, borderWidth: 0.8, borderColor: 'grey', borderRadius: 10, padding: 8 }}>
            <Text style={styles.dateText}>{'From:' + ' ' + props.from.toDateString().slice(4, props.from.length)}</Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={isFromDPVisible}
            mode="date"
            onConfirm={handleFromConfirm}
            onCancel={() => setFromDPVisibility(false)}
          />
          <TouchableOpacity onPress={() => setToDPVisibility(true)} style={{ flex: 1, height: 35, borderWidth: 0.8, borderColor: 'grey', borderRadius: 10, padding: 8 }}>
            <Text style={styles.dateText}>{'To:' + ' ' + props.to.toDateString().slice(4, props.to.length)}</Text>
          </TouchableOpacity>
          <DateTimePicker
            minimumDate={props.from}
            isVisible={isToDPVisible}
            mode="date"
            onConfirm={handleToConfirm}
            onCancel={() => setToDPVisibility(false)}
          />
        </View>
        <FlatList
          style={styles.flatlist}
          data={props.store.housemates}
          renderItem={({ item }) => (
            <NameCardWithDays item={item} days={item.days}/>
          )}
        />
      </View>
    );
  }
}

// The main component rendering the views based on the return of the component above.
const SettingsModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const toggleSwitch = (option) => {
    props.setSplitOption(option);
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Split Options</Text>
            <View style={{ alignItems: 'center' }}>
              <Text>Do you want to split based on usage?</Text>
              <Switch
                style={{ marginTop: 10, marginBottom: 5 }}
                trackColor={{ false: "#767577", true: "#53d769" }}
                thumbColor={props.splitOption ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={props.splitOption}
              />
            </View>
            <DateSelection store={props} from={from} setFrom={setFrom} to={to} setTo={setTo}/>
            <View style={{ alignItems: 'center' }}>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Feather name="check-circle" size={40} color="green" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.sectionButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Split Options</Text>
        <MaterialCommunityIcons name="cog-outline" size={50} color="white" style={{ paddingLeft: 25 }} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  dateText: {
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: 'Avenir Next'
  },
  flatlist: {
    width: '100%',
    height: '45%',
    marginVertical: 10
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
    marginBottom: 15,
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
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#B0A3E1'
  },
  splitOuterContainer: {
    flex: 1,
    width: '100%'
  },
  splitInnerContent: {
    flexDirection: 'row',
    marginTop: 10
  },
  textStyle: {
    color: "white",
    fontFamily: "Avenir Next",
    textAlign: "center",
    fontSize: 20,
    padding: 5
  }
});

const mapStateToProps = (state) => {
  return {
    splitOption: state.splitOption,
    housemates: state.housemates,
    durationOfBill: state.durationOfBill
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSplitOption: (option) => dispatch(setSplitOption(option)),
    setDurationOfBill: (days) => dispatch(setDurationOfBill(days)),
    setDateOfBill: (date) => dispatch(setDateOfBill(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);