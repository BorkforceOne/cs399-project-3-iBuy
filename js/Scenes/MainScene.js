import React, { Component, PropTypes } from 'react';
import { View, TouchableHighlight, StyleSheet, Text as ReactText } from 'react-native';
import { Container, Button, List, Header, Title, Icon, Footer, FooterTab, Content, Badge, Text } from 'native-base';
import ColorCodedListItem from '../Components/ColorCodedListItem';
import Drawer from 'react-native-drawer';
import MainDrawer from '../Drawers/MainDrawer';
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
                    category: 'Household - Cleaning',
                    color: "#f33"
                },
                {
                    name: "Light Bulbs",
                    quantity: 2,
                    cost: 3.00,
                    purchaser: null,
                    category: 'Household - Maintenance',
                    color: "#1a1"
                }
            ],
            showDrawer: false
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
                <ColorCodedListItem key={i} iconLeft color={item.color}>
                    <Icon name='md-home' />
                    <Text>{item.name}</Text>
                    <Text note>{(item.cost * item.quantity).toCurrency() + " (" + item.cost.toCurrency() + " ea) "}</Text>
                    <Badge info textStyle={{lineHeight: 20}}>{item.quantity}</Badge>
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
                content={<MainDrawer {...this.props}/>}
                elevation={15}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2-ratio/2) },
                    mainOverlay: { opacity:ratio/1.75 }
                })}
                >
                <Container>
                    <Header>
                        <Button transparent onPress={this.onShowDrawer.bind(this)}>
                            <Icon name="md-menu" />
                        </Button>
                        <Title>Item View</Title>
                    </Header>
                    <Content>
                        <List>
                            {items}
                        </List>
                    </Content>
                    <View style={styles.addButton}>
                        <Button rounded primary textStyle={{lineHeight: 20}}>
                            <Icon name="md-person-add" />
                        </Button>
                    </View>
                    <Footer>
                        <FooterTab>
                            <Button active>
                                Items
                                <Icon name="md-cart"/>
                            </Button>
                            <Button>
                                Groups
                                <Icon name="md-people"/>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </Drawer>
        )
    }
}

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    mainOverlay: { backgroundColor: 'black' },
    main: { paddingLeft: 3 }
};

const styles = StyleSheet.create({
    addButton: {
        position: "absolute",
        right: 25,
        bottom: 80
    }
});
