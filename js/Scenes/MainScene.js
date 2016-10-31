import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Container, Button, List, ListItem, Header, Title, Icon, Footer, FooterTab, Content, Badge } from 'native-base';

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
    render() {

        let items = this.state.items.map((item, i) => {
            return (
                <ListItem key={i}>
                    <Text>{item.name}</Text>
                    <Badge info textStyle={{lineHeight: 20}}>{item.quantity}</Badge>
                </ListItem>
            );
        });

        return (
            <Container>
                <Header>
                    <Button transparent>
                        <Icon name="md-menu" />
                    </Button>
                    <Title>Item View</Title>
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
        )
    }
}

const styles = StyleSheet.create({

});
