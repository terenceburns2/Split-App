import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import IndividualSplitDetail from './components/IndividualSplitDetail';
import { LogBox } from 'react-native';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native'

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']); //TODO: FIX

// Contained with the navigation container within BreakdownNav.
// Renders a view detailing the split of the bill given the user options selected.
// The configuration options are obtained through the react redux store.
const Breakdown = (props) => {
    const [usage, setUsage] = useState("0.00");
    const [standard, setStandard] = useState("0.00");
    const [sumDays, setSumDays] = useState(0);

    // Calculates the sum of days each person was present in the house.
    // This is used to calculate the proportion of the bill the user needs to pay.
    // Also retrieves the correct usage and standard input from the redux store based on the bill type.
    useEffect(() => {
        let sum = 0;
        props.housemates.forEach((item) => {
            sum += item.days;
        });
        setSumDays(sum);

        switch (props.billType) {
            case "Broadband":
                setUsage(props.broadbandBill);
                setStandard("0.00");
                break;
            case "Gas/electric":
                setUsage(props.usgGEBill);
                setStandard(props.stdGEBill);
                break;
            case "Water":
                setUsage(props.usgWaterBill);
                setStandard(props.stdWaterBill);
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Text style={[{ position: 'absolute', fontSize: 12, top: 50, right: 20 }, styles.text]}>{props.dateOfBill}</Text>
                <Text style={styles.title}>Breakdown</Text>
                <Text style={styles.subtitle}>Below shows the split of your bills.</Text>
                <View style={styles.whiteCircle} />
                <View style={styles.backButton}>
                    <Pressable
                        style={{ left: 10 }}
                        onPress={() => props.navigation.goBack()}
                    >
                        <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
                    </Pressable>
                </View>
                {/* Note: This is used so that when the user moves away from this view, we trigger
                    the screen to move back to CalculateBreakdown. This is done so as to avoid the user
                    from inputting invalid details and seeing erroroneous calculations. Rather, they must 
                    move from the CalculateBreakdown page to intitate the calculation logic (and along with it, 
                    the validation logic). */}
                <VisibilitySensor
                    onChange={(isVisible) => {
                        if (isVisible == false)
                            props.navigation.goBack();
                    }}
                >
                    <Image
                        style={styles.thumbsUpImage}
                        source={require('../../assets/thumbsup.png')}
                    />
                </VisibilitySensor>
            </View>
            <Text style={[{ fontSize: 30, marginTop: 25, marginLeft: 20 }, styles.text]}>Total</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ opacity: 0.8, marginTop: 3, marginLeft: 25 }}>Usage charge</Text>
                <Text style={{ opacity: 0.8, marginTop: 4, marginLeft: 170 }}>£{usage}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ opacity: 0.8, marginTop: 5, marginLeft: 25 }}>Standard charge</Text>
                <Text style={{ opacity: 0.8, marginTop: 4, marginLeft: 152 }}>£{standard}</Text>
            </View>
            <View style={styles.dividerLine} />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={props.housemates}
                    renderItem={({ item }) => (
                        <IndividualSplitDetail splitOption={props.splitOption} housemate={item} numHousemates={props.housemates.length} usage={usage} standard={standard} sumDays={sumDays} />
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backButton: {
        alignSelf: 'flex-start',
        marginTop: '10%',
        marginLeft: 10
    },
    banner: {
        backgroundColor: '#FFA05C',
        height: 215
    },
    container: {
        flex: 1
    },
    dividerLine: {
        marginTop: 30,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        opacity: 0.3,
        width: '90%',
        alignSelf: 'center'
    },
    subtitle: {
        position: 'absolute',
        fontFamily: 'Avenir Next',
        fontSize: 20,
        opacity: 0.6,
        top: 145,
        left: 22,
        width: 240
    },
    thumbsUpImage: {
        position: 'absolute',
        top: -6,
        left: 255,
        width: 100,
        width: 100,
        resizeMode: 'contain'
    },
    title: {
        position: 'absolute',
        fontFamily: 'Avenir Next',
        fontSize: 40,
        top: 85,
        left: 20,
        alignSelf: 'center'
    },
    text: {
        fontFamily: 'Avenir Next'
    },
    whiteCircle: {
        position: 'absolute',
        top: 155,
        left: 250,
        backgroundColor: 'white',
        borderRadius: 100,
        width: 110,
        height: 110
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
    };
}

export default connect(mapPropsToState, null)(Breakdown);