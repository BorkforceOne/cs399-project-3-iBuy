/**
 * Created by Brandon Garling on 10/30/2016.
 */
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, InputGroup, Input, Header, Title, Icon, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import Actions from '../Store/Actions';
import User from '../Models/User';
import Notification from '../Components/Notification';

class RegisterScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Password: "",
            Firstname: "",
            Lastname: ""
        };
    }
    onGoBack() {
        this.props.navigator.pop();
    }
    onRegister() {
        let user = new User();
        user.Email = this.state.Email;
        user.Password = this.state.Password;
        user.Firstname = this.state.Firstname;
        user.Lastname = this.state.Lastname;

        this.props.dispatch(Actions.createUser(user))
            .then(user => {
                this.props.dispatch(Actions.addNotification("User account created"));
                this.props.navigator.pop();
            })
            .catch((error) => {});
    }
    onInputChange(field, event) {
        this.setState({
            [field]: event.nativeEvent.text
        });
    }
    render() {
        let notifications = this.props.notifications;
        let notificationRender = [];

        for (let id in notifications) {
            if (notifications.hasOwnProperty(id)) {
                let notification = notifications[id];
                notificationRender.push(<Notification key={id} text={notification.Contents}/>)
            }
        }

        return (
            <Container>
                <Header>
                    <Button transparent onPressOut={this.onGoBack.bind(this)}>
                        <Icon name='md-arrow-back' />
                    </Button>

                    <Title>Register</Title>
                </Header>

                <View style={styles.mainView}>
                    {notificationRender}
                    <View style={{flex: 1}}>
                        <Text style={styles.titleText}>GroupBuy</Text>
                    </View>
                    <List style={{flex: 1}}>
                        <ListItem>
                            <InputGroup>
                                <Input placeholder="Email" onChange={this.onInputChange.bind(this, 'Email')}/>
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup>
                                <Input placeholder="Password" secureTextEntry onChange={this.onInputChange.bind(this, 'Password')}/>
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup>
                                <Input placeholder="Firstname" onChange={this.onInputChange.bind(this, 'Firstname')}/>
                            </InputGroup>
                        </ListItem>

                        <ListItem>
                            <InputGroup>
                                <Input placeholder="Lastname" onChange={this.onInputChange.bind(this, 'Lastname')}/>
                            </InputGroup>
                        </ListItem>
                    </List>
                    <View style={styles.buttonView}>
                        <Button style={styles.button} onPress={this.onRegister.bind(this)}>Register</Button>
                    </View>
                </View>
            </Container>
        )
    }
}

// Set up proptypes
RegisterScene.propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    notifications: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
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

const mapStateToProps = function (store) {
    return {
        users: store.userState,
        notifications: store.notificationState
    };
};

export default connect(mapStateToProps)(RegisterScene);