import React, { Component, PropTypes } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import { Container, Button, List, ListItem, Header, Title, Icon, Footer, FooterTab, Content, Badge, Text } from 'native-base';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

import '../Utils/NumberHelpers';

export default class MainScene extends Component {
    constructor() {
        super();
        this.state = {
            items: [
                {
                    name: "Paper Towels",
                    quantity: 5,
                    cost: 4.00,
                    purchaser: null,
                    category: 'Household - Cleaning'
                },
                {
                    name: "Light Bulbs",
                    quantity: 2,
                    cost: 3.00,
                    purchaser: null,
                    category: 'Household - Maintenance'
                }
            ]
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
        }
        else {
            this.props.navigator.push({
                id: id
            });
        }
    }

    render() {

        let items = this.state.items.map((item, i) => {
            return (
                <ListItem key={i} iconLeft>
                    <Icon name='md-home' />
                    <Text>{item.name}</Text>
                    <Text note>{(item.cost * item.quantity).toCurrency() + " (" + item.cost.toCurrency() + " ea) "}</Text>
                    <Badge info textStyle={{lineHeight: 20}}>{item.quantity}</Badge>
                </ListItem>
            );
        });

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
                            <Icon name="md-menu" />
                        </Button>
                        <Title>Item View</Title>
                        <Button transparent onPress={this.openMenu.bind(this)}>
                            <Icon name="md-more" />
                        </Button>
                    </Header>
                    <Content>

                        <List>
                            {items}
                        </List>
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button>
                                Items
                                <Icon name="md-cart" />
                            </Button>
                            <Button>
                                Group Members
                                <Icon name="md-person" />
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </MenuContext>
        )
    }
}

const styles = StyleSheet.create({
    moreMenu: {
        position: 'absolute',
        top: 5,
        right: 5
    }
});
