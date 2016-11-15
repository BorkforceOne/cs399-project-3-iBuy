/**
 * Created by Brandon Garling on 10/30/2016.
 */
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Header, Icon, Title, Content, H3, Input, InputGroup, List, ListItem} from 'native-base';
import { connect } from 'react-redux';
import Actions from '../Store/Actions';

class GroupSettingsScene extends Component {
    constructor(props) {
        super(props);
    }
    onGoBack() {
        this.props.navigator.pop();
    }
    onInputChange(field, event) {
        let group = this.props.groups[this.props.route.groupId];
        group[field] = event.nativeEvent.text;
        this.props.dispatch(Actions.updateGroup(group));
    }
    render() {

        let group = this.props.groups[this.props.route.groupId];

        let userRows = [];
        for (let id in this.props.users) {
            let user = this.props.users[id];
            userRows.push(
                <ListItem key={id}>
                    <View style={{flex: 1, flexDirection: 'row' }}>
                        <Text style={{flex: 1, textAlignVertical: 'center'}}>{user.Firstname} {user.Lastname}</Text>
                        <Text style={{flex: 1, textAlignVertical: 'center'}}>{user.Email}</Text>
                        <Icon name="md-trash"/>
                    </View>
                </ListItem>
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
                                <InputGroup>
                                    <Input inlineLabel label="COLOR" value={group.Color} onChange={this.onInputChange.bind(this, 'Color')} />
                                </InputGroup>
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
                                    <Input inlineLabel label="INVITE" placeholder="email@example.com" onChange={this.onInputChange.bind(this, 'Name')} />
                                </InputGroup>
                            </ListItem>
                            <ListItem>
                                <Button style={{flex: 0.3}} block>Invite</Button>
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
        groups: store.groupState,
        memberships: store.membershipState,
        users: store.userState
    };
};

export default connect(mapStateToProps)(GroupSettingsScene);