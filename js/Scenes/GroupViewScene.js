import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Button, List, Header, Title, Icon, Footer, FooterTab, Content, Badge, Text } from 'native-base';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import ColorCodedListItem from '../Components/ColorCodedListItem';
import '../Utils/NumberHelpers';
import {connect} from 'react-redux';
import Actions from '../Store/Actions';
import Group from '../Models/Group';
import Selectors from '../Store/Selectors';

class GroupViewScene extends Component {
    constructor() {
        super();
    }

    openMenu() {
        this.refs.MenuContext.openMenu("menu");
    }

    gotoScene(id, entityId) {
        if (id == "sign-in") {
            this.props.navigator.resetTo({
                id: id
            });
        } else if (id == "group-settings") {
            this.props.navigator.push({
                id: id,
                groupId: entityId
            });
        } else if (id == "group-view" || id == "item-view") {
            this.props.navigator.replace({
                id: id
            });
        } else {
            this.props.navigator.push({
                id: id
            });
        }
    }

    onAddGroup() {
        let group = new Group();
        this.props.dispatch(Actions.addGroup(group));

        this.gotoScene("group-settings", group.Id);
    }

    render() {

        let items = [];
        for (let id in this.props.groups) {
            let item = this.props.groups[id];
            items.push(
                <ColorCodedListItem key={id} color={item.Color} button onPress={this.gotoScene.bind(this, "group-settings", id)}>
                    <Text>{item.Name}</Text>
                    <Text note>{item.UserIds.length + " members"}</Text>
                </ColorCodedListItem>
            );
        }

        return (
            <MenuContext style={{ flex: 1 }} ref="MenuContext">
                <Menu name="menu" style={styles.moreMenu} onSelect={this.gotoScene.bind(this)}>
                    <MenuTrigger>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption value="about">
                            <Text>About</Text>
                        </MenuOption>
                        <MenuOption value="sign-in">
                            <Text>Log Out</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
                <Container>
                    <Header>
                        <Button transparent>
                            {" "}
                        </Button>
                        <Title>My Groups</Title>
                        <Button transparent onPress={this.openMenu.bind(this)}>
                            <Icon name="md-more" />
                        </Button>
                    </Header>
                    <Content>
                        <List>
                            {items}
                        </List>
                    </Content>
                    <View style={styles.addButton}>
                        <Button rounded primary style={{width: 60, height: 60}} onPress={this.onAddGroup.bind(this)}>
                            <Icon name="md-add" />
                        </Button>
                    </View>
                    <Footer>
                        <FooterTab>
                            <Button onPress={this.gotoScene.bind(this, "item-view")}>
                                Items
                                <Icon name="md-cart"/>
                            </Button>
                            <Button active>
                                Groups
                                <Icon name="md-people"/>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </MenuContext>
        )
    }
}

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    mainOverlay: { backgroundColor: 'black', opacity: 0 },
    main: { paddingLeft: 3 }
};

const styles = StyleSheet.create({
    addButton: {
        position: "absolute",
        right: 25,
        bottom: 80
    },
    moreMenu: {
        position: 'absolute',
        top: 5,
        right: 5
    }
});

const mapStateToProps = function(store) {
    return {
        groups: Selectors.getGroups(store)
    };
};

export default connect(mapStateToProps)(GroupViewScene);