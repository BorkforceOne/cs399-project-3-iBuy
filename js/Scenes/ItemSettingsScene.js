import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Header, Icon, Title, Content, InputGroup, Input, List, ListItem} from 'native-base';

export default class ItemSettingsScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                name: "Paper Towels",
                quantity: 5,
                cost: 4.00,
                purchaser: null,
                category: 'Household - Cleaning',
                due: "Tomorrow",
                color: "#f33"
            }
        }
    }
    onGoBack() {
        this.props.navigator.pop();
    }
    render() {

        return (
            <Container>
                <Header>
                    <Button transparent onPressOut={this.onGoBack.bind(this)}>
                        <Icon name='md-arrow-back' />
                    </Button>

                    <Title>Item Settings</Title>
                </Header>

                <Content>

                    <List>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="NAME" value={this.state.item.name} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="CATEGORY" value={this.state.item.category} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="DUE DATE" value={this.state.item.due} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="QUANTITY" value={this.state.item.quantity.toString()} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="ITEM COST" value={this.state.item.cost.toCurrency()} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup disabled>
                                <Input inlineLabel label="TOTAL COST" value={(this.state.item.cost*this.state.item.quantity).toCurrency()} />
                            </InputGroup>
                        </ListItem>
                    </List>

                </Content>
            </Container>
        )
    }
}

// Set up proptypes
ItemSettingsScene.propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
};

const styles = StyleSheet.create({

});
