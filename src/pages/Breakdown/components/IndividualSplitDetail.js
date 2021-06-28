import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// This component calculates and presents the details of each split among each housemate.
const IndividualSplitDetail = (props) => {
    const [usgSplit, setUsgSplit] = useState(0);
    const [stdSplit, setStdSplit] = useState(0);
    const [total, setTotal] = useState(0);

    // Conditional render based on whether the split should be based on presence in house (true)
    // or evenly split (false)
    useEffect(() => {
        if (props.splitOption == true) {
            // Calculate usage split
            let usg = parseFloat(((props.housemate.days / props.sumDays) * parseFloat(props.usage)));
            setUsgSplit(usg.toFixed(2));
            // Calculate standard split
            let std = parseFloat(props.standard) / props.numHousemates;
            setStdSplit(std.toFixed(2));
            let total = std + usg;
            setTotal(total.toFixed(2));
        } else { // Split evenly
            let usg = parseFloat(props.usage) / props.numHousemates;
            let std = parseFloat(props.standard) / props.numHousemates;
            let total = std + usg;
            setUsgSplit(usg.toFixed(2));
            setStdSplit(std.toFixed(2));
            setTotal(total.toFixed(2));
        }
    });

    const UsageHeading = () => {
        if (props.splitOption) {
            return (
                <Text style={styles.heading}>({props.housemate.days} / {props.sumDays}) x {props.usage}</Text>
            );
        } else {
            return (
                <Text style={styles.heading}>Usage split</Text>
            );
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{props.housemate.name}</Text>
            <View style={{ flexDirection: 'row' }}>
                <UsageHeading />
                <Text style={styles.cost}>£{usgSplit}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.heading}>Standard rate split</Text>
                <Text style={styles.cost}>£{stdSplit}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.heading}>Total</Text>
                <Text style={styles.cost}>£{total}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 25
    },
    text: {
        marginLeft: 20,
        marginBottom: 5,
        fontFamily: 'Avenir Next'
    },
    name: {
        fontSize: 20,
        fontFamily: 'Avenir Next',
    },
    cost: {
        position: 'absolute',
        fontFamily: 'Avenir Next',
        marginLeft: 265
    }
});

export default IndividualSplitDetail;