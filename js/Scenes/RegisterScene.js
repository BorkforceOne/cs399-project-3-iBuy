/**
 * Created by Brandon Garling on 10/30/2016.
 */
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, InputGroup, Input, Header, Title, Icon, List, ListItem } from 'native-base';

export default class RegisterScene extends Component {
    constructor(props) {
        super(props);
    }
    onGoBack() {
        this.props.navigator.pop();
    }
    render() {
        return (
            <Container>
                <Header>
                    <Button transparent onPressOut={this.onGoBack.bind(this)}>
                        <Icon name='md-arrow-back' />
                    </Button>

                    <Title>Register</Title>
                </Header>

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

                        <ListItem>
                            <InputGroup>
                                <Input placeholder="Firstname"/>
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup>
                                <Input placeholder="Lastname"/>
                            </InputGroup>
                        </ListItem>
                    </List>
                    <View style={styles.buttonView}>
                        <Button style={styles.button}>Register</Button>
                    </View>
                </View>
            </Container>
        )
    }
}

// Set up proptypes
RegisterScene.propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 50,
        textAlign: 'center',
        paddingTop: 50
    },
    mainView: {
        flex: 1,
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
