import React, { Component, PropTypes } from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';
import { Container, Button, List, ListItem, Header, Title, Icon, Footer, FooterTab, Content, Badge, Text, Thumbnail } from 'native-base';
import Drawer from 'react-native-drawer';
import '../Utils/NumberHelpers';

export default class MainDrawer extends Component {
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
            ],
            showDrawer: false
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
            <Container>
                <Header style={{height: 100}}>
                    <Title>test</Title>
                </Header>
                <Content style={styles.content}>
                    <List>
                        {items}
                    </List>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white'
    }
});
