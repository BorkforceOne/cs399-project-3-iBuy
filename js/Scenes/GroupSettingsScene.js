/**
 * Created by Brandon Garling on 10/30/2016.
 */
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Container, Button, Header, Icon, Title, Content, H3, Input, InputGroup, List, ListItem} from 'native-base';
import { connect } from 'react-redux';
import Actions from '../Store/Actions';
import Picker from '../Components/Picker';
import Selectors from '../Store/Selectors';
import GroupMembership from '../Models/GroupMembership';

const Item = Picker.Item;

const availableColors = {
    "Red" : "crimson",
    "Orange" : "darkorange",
    "Yellow" : "gold",
    "Green": "forestgreen",
    "Blue" : "royalblue",
    "Purple": "rebeccapurple",
    "Black": "black",
    "Gray": "slategray",
    "White": "white",
    "Brown": "saddlebrown",
    "Pink": "hotpink"
};

class GroupSettingsScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteEmail: ""
        };
    }
    onGoBack() {
        this.props.navigator.pop();
    }
    onInputChange(field, event) {
        let group = this.props.groups[this.props.route.groupId];
        group[field] = event.nativeEvent.text;
        this.props.dispatch(Actions.updateGroup(group));
    }
    onSelectionChange(field, newValue) {
        let group = this.props.groups[this.props.route.groupId];
        group[field] = newValue;
        this.props.dispatch(Actions.updateGroup(group));
    }
    onEditInviteEmail(event) {
        this.setState({
            inviteEmail: event.nativeEvent.text
        });
    }
    deleteMembership(userId) {
        for (let id in this.props.memberships) {
            let membership = this.props.memberships[id];
            if (membership.UserId == userId) {
                this.props.dispatch(Actions.removeMembership(membership));
                if (userId == this.props.session.Id)
                    this.onGoBack();
                return;
            }
        }
    }
    inviteUser() {
        let email = this.state.inviteEmail;

        let found = false;

        for (let id in this.props.users) {
            let user = this.props.users[id];
            if (user.Email == email) {

                for (let i = 0; i < user.GroupIds.length; i++) {
                    if (this.props.route.groupId == user.GroupIds[i]) {
                        Alert.alert("Already in group", "The user you invited is already in the group",
                        [
                            {text:"Ok"}
                        ]);
                        return;
                    }
                }

                let membership = new GroupMembership();
                membership.UserId = user.Id;
                membership.GroupId = this.props.route.groupId;
                this.props.dispatch(Actions.addMembership(membership));
                found = true;

                this.setState({
                    inviteEmail: ""
                });
                return;
            }
        }

        Alert.alert("User not found", "A user with that email was not found",
        [
            {text:"Ok"}
        ]);
    }
    render() {

        let group = this.props.groups[this.props.route.groupId];

        if (!group)
            return null;

        let userRows = [];
        for (let i = 0; i < group.UserIds.length; i++) {
            let user = this.props.users[group.UserIds[i]];
            if (user) {
                userRows.push(
                    <ListItem key={i}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{flex: 1, textAlignVertical: 'center'}}>{user.Firstname} {user.Lastname}</Text>
                            <Text style={{flex: 1, textAlignVertical: 'center'}}>{user.Email}</Text>
                            <Button danger onPress={this.deleteMembership.bind(this, user.Id)}>
                                <Icon name="md-trash"/>
                            </Button>
                        </View>
                    </ListItem>
                );
            }
        }

        let colorOptions = [];
        for (let id in availableColors) {
            colorOptions.push(
                <Item label={id} value={availableColors[id]} key={id} />
            );
        }

        return (
            <Container>
                <Header>
                    <Button transparent onPressOut={this.onGoBack.bind(this)}>
                        <Icon name='md-arrow-back' />
                    </Button>

                    <Title>Group Settings</Title>
                </Header>

                <Content style={styles.mainContent}>
                    <View>
                        <H3 style={styles.H3}>Settings</H3>
                        <List>
                            <ListItem>
                                <InputGroup>
                                    <Input inlineLabel label="NAME" value={group.Name} onChange={this.onInputChange.bind(this, 'Name')} />
                                </InputGroup>
                            </ListItem>
                            <ListItem>
                                <Picker label="COLOR" value={group.Color} onChange={this.onSelectionChange.bind(this, "Color")}>
                                    {colorOptions}
                                </Picker>
                            </ListItem>
                        </List>
                    </View>
                    <View>
                        <H3 style={styles.H3}>Users</H3>
                        {userRows.length == 0 ? <Text style={{marginLeft: 40, marginBottom: 20}}>No users exist in this group</Text> :
                            <List style={{padding: 10}}>
                                <ListItem>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Text style={{flex: 1, color: 'black'}}>Name</Text>
                                        <Text style={{flex: 1, color: 'black'}}>Email</Text>
                                    </View>
                                </ListItem>
                                {userRows}
                            </List>
                        }
                        <List>
                            <ListItem>
                                <InputGroup>
                                    <Input inlineLabel label="INVITE" placeholder="email@example.com" value={this.state.inviteEmail} onChange={this.onEditInviteEmail.bind(this)} />
                                </InputGroup>
                            </ListItem>
                            <ListItem>
                                <Button style={{flex: 0.3}} block onPress={this.inviteUser.bind(this)}>Invite</Button>
                            </ListItem>
                        </List>
                    </View>
                </Content>
            </Container>
        )
    }
}

// Set up proptypes
GroupSettingsScene.propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    memberships: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    mainContent: {
        // margin: 10
    },
    H3: {
        padding: 10,
        margin: 10
    },
    inlineInputView: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    }
});

const mapStateToProps = function (store) {
    return {
        groups: Selectors.getGroups(store),
        memberships: Selectors.getMemberships(store),
        users: Selectors.getUsers(store),
        session: Selectors.getSession(store)
    };
};

export default connect(mapStateToProps)(GroupSettingsScene);