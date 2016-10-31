import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Container, Button, InputGroup, Input } from 'native-base';

export default class SignInScene extends Component {
    render() {
        return (
            <Container>
                <View style={styles.mainView}>
                    <View style={{flex: 1}}>
                        <Text style={styles.title}>GroupBuy</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <InputGroup>
                            <Input placeholder="Email"/>
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Password" secureTextEntry/>
                        </InputGroup>
                    </View>
                    <View style={styles.buttonView}>
                        <Button style={styles.button}>Sign In</Button>
                        <Button style={styles.button}>Register</Button>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    elevatedButton: {
        elevation: 10,
        width: 50,
        height: 50
    },
    title: {
        fontSize: 50,
        textAlign: 'center'
    },
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    button: {
        margin: 5
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
