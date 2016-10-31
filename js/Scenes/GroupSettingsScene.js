/**
 * Created by Brandon Garling on 10/30/2016.
 */
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Header, Icon, Title, Content, H3, Input, List, ListItem} from 'native-base';

export default class GroupSettingsScene extends Component {
    constructor(props) {
        super(props);
    }
    static get defaultProps() {
        return {
            'users': [
                {
                    'firstname': 'Brandon',
                    'lastname': 'Garling',
                    'email': 'bjg96@nau.edu'
                },
                {
                    'firstname': 'Harrison',
                    'lastname': 'Lambeth',
                    'email': 'harrison@nau.edu'
                }
            ]
        }
    }
    onGoBack() {
        this.props.navigator.pop();
    }
    render() {
        let users = this.props.users.map((element, index) => {
            return (
                <ListItem key={index}>
                    <View style={{flex: 1, flexDirection: 'row' }}>
                        <Text style={{flex: 1, textAlignVertical: 'center'}}>{element.firstname} {element.lastname}</Text>
                        <Text style={{flex: 1, textAlignVertical: 'center'}}>{element.email}</Text>
                        <Icon name="md-trash"/>
                    </View>
                </ListItem>);
        });

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
                        <H3 style={styles.H3}>Manage Users</H3>
                        <List style={{padding: 10}}>
                            <ListItem>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <Text style={{flex: 1, color: 'black'}}>Name</Text>
                                    <Text style={{flex: 1, color: 'black'}}>Email</Text>
                                </View>
                            </ListItem>
                            {users}
                        </List>
                        <View style={styles.inlineInputView}>
                            <Input style={{flex: 1}} placeholder='Email' />
                            <Button style={{flex: 0.3}} block>Invite</Button>
                        </View>
                    </View>

                    <View>
                        <H3 style={styles.H3}>Group Name</H3>
                        <View style={styles.inlineInputView}>
                            <Input style={{flex: 1}} placeholder='Group Name' value='Home' />
                            <Button style={{flex: 0.3}} block>Change</Button>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

// Set up proptypes
GroupSettingsScene.propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    mainContent: {
        margin: 10
    },
    H3: {
        padding: 10
    },
    inlineInputView: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    }
});
