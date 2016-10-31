import React, { Component, PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container, Button, InputGroup, Input, List, ListItem, View } from 'native-base';

export default class SignInScene extends Component {
    constructor(props) {
        super(props);
    }
    onGotoScene(id) {
        this.props.navigator.push({
            id: id
        });
    }
    onSignin() {
        this.props.navigator.resetTo({
            id: 'item-view'
        });
    }
    render() {
        return (
            <Container>
                <View style={styles.mainView}>
                    <View style={{flex: 1}}>
                        <Text style={styles.titleText}>GroupBuy</Text>
                    </View>

                    <List style={{flex: 1}}>
                        <ListItem>
                            <InputGroup>
                                <Input placeholder="Email"/>
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup>
                                <Input placeholder="Password" secureTextEntry/>
                            </InputGroup>
                        </ListItem>
                    </List>

                    <View style={{flex: 1}}>
                        <View style={styles.buttonView}>
                            <Button style={styles.button} onPressOut={this.onSignin.bind(this)}>Sign In</Button>
                            <Button style={styles.button} onPressOut={this.onGotoScene.bind(this, 'register')}>Register</Button>
                        </View>
                        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                            <Button transparent onPressOut={this.onGotoScene.bind(this, 'about')}>About</Button>
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
