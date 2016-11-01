import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Button, List, Header, Title, Icon, Footer, FooterTab, Content, Badge, Text } from 'native-base';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import ColorCodedListItem from '../Components/ColorCodedListItem';
import Drawer from 'react-native-drawer';
import ItemFilterDrawer from '../Drawers/ItemFilterDrawer';
import '../Utils/NumberHelpers';

export default class ItemViewScene extends Component {
    constructor() {
        super();
        this.state = {
            items: [
                {
                    name: "Paper Towels",
                    quantity: 5,
                    cost: 4.00,
                    purchaser: null,
                    category: 'Household - Cleaning',
                    due: "tomorrow",
                    color: "#f33"
                },
                {
                    name: "Light Bulbs",
                    quantity: 2,
                    cost: 3.00,
                    purchaser: null,
                    category: 'Household - Maintenance',
                    due: "in 5 days",
                    color: "#1a1"
                }
            ],
            showDrawer: false
        }
    }
    openMenu() {
        this.refs.MenuContext.openMenu("menu");
    }

    gotoScene(id) {
        if (id == "sign-in") {
            this.props.navigator.resetTo({
                id: id
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

    onShowDrawer() {
        this.setState({
            showDrawer: true
        })
    }
    render() {

        let items = this.state.items.map((item, i) => {
            return (
                <ColorCodedListItem key={i} iconLeft color={item.color} button onPress={this.gotoScene.bind(this, "item-settings")}>
                    <Icon name='md-home' />
                    <Text>{item.name + " (" + item.quantity + ")"}</Text>
                    <Text note>{"due " + item.due + "  "}</Text>
                    <Badge info textStyle={{lineHeight: 20}}>{(item.cost * item.quantity).toCurrency()}</Badge>
                </ColorCodedListItem>
            );
        });

        return (
            <Drawer
                open={this.state.showDrawer}
                type="overlay"
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                acceptTap={true}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                content={<ItemFilterDrawer {...this.props}/>}
                elevation={15}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2-ratio/2) },
                    mainOverlay: { opacity:ratio/1.75 }
                })}
                >
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
                            <Button transparent onPress={this.onShowDrawer.bind(this)}>
                                <Icon name="md-menu" />
                            </Button>
                            <Title>Item View - Next 7 Days</Title>
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
                            <Button rounded primary style={{width: 60, height: 60}}>
                                <Icon name="md-add" />
                            </Button>
                        </View>
                        <Footer>
                            <FooterTab>
                                <Button active>
                                    Items
                                    <Icon name="md-cart"/>
                                </Button>
                                <Button onPress={this.gotoScene.bind(this, "group-view")}>
                                    Groups
                                    <Icon name="md-people"/>
                                </Button>
                            </FooterTab>
                        </Footer>
                    </Container>
                </MenuContext>
            </Drawer>
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
