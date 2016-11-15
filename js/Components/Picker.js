import React, { Component } from 'react';
import {
    DatePickerAndroid,
    StyleSheet,
    Text,
    TimePickerAndroid,
    View,
    Picker as NBPicker
} from 'react-native';
import Time from '../Utils/Time';
import { Button } from 'native-base';

const styles = StyleSheet.create({
    label: {
        flex: 1,
        textAlign: 'center',
        color: '#575757',
        fontSize: 16
    },
    button: {
        flex: 2,
    },
    listView: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: 15
    }
});

export default class Picker extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.listView}>
                <Text style={styles.label}>{this.props.label}</Text>
                <NBPicker style={styles.button} selectedValue={this.props.value} onValueChange={this.props.onChange}>
                    {this.props.children}
                </NBPicker>
            </View>
        );
    }
}

Picker.PropTypes = {
    value: React.PropTypes.any,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
};

Picker.Item = NBPicker.Item;
export const Item = NBPicker.Item;