import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Container, Button, InputGroup, Input } from 'native-base';

export default class SignInScene extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    render() {
        return (
            <Container>
                <View style={styles.mainView}>
                    <View style={{flex: 1}}>
                        <Text style={styles.titleText}>GroupBuy</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <InputGroup>
                            <Input placeholder="Email"/>
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder="Password" secureTextEntry/>
                        </InputGroup>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={styles.buttonView}>
                            <Button style={styles.button}>Sign In</Button>
                            <Button style={styles.button}>Register</Button>
                        </View>
                        <View style={{flex: 2}}>
                            <TouchableHighlight>
                                <Text style={styles.aboutText}>About</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}

// Set up proptypes
SignInScene.propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 50,
        textAlign: 'center'
    },
    aboutText: {
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
