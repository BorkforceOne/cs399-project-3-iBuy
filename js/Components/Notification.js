/**
 * Created by Brandon Garling on 11/14/2016.
 */
import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Notification extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        )
    }
}

Notification.propTypes = {
    text: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        backgroundColor: '#f00'
    },
    text: {
        textAlign: 'center'
    }
});