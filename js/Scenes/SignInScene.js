import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, InputGroup, Input } from 'native-base';

export default class SignInScene extends Component {
    constructor(props) {
        super(props);
    }
    onGotoAboutScene() {
        this.props.navigator.push({
            id: 'about'
        })
    }
    render() {
        return (
            <Container>
                <View style={styles.mainView}>
                    <View style={{flex: 1}}>
                        <Text style={styles.titleText}>GroupBuy</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 0.1}}/>
                        <View style={{flex: 0.8}}>
                            <InputGroup>
                                <Input placeholder="Email"/>
                            </InputGroup>
                            <InputGroup>
                                <Input placeholder="Password" secureTextEntry/>
                            </InputGroup>
                        </View>
                        <View style={{flex: 0.1}}/>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={styles.buttonView}>
                            <Button style={styles.button}>Sign In</Button>
                            <Button style={styles.button}>Register</Button>
                        </View>
                        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <Button transparent onPress={this.onGotoAboutScene.bind(this)}>About</Button>
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
        textAlign: 'center',
        paddingTop: 50
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
