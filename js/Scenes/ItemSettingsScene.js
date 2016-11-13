import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Header, Icon, Title, Content, InputGroup, Input, List, ListItem} from 'native-base';
import { connect } from 'react-redux';
import Time from '../Utils/Time';
import Actions from '../Store/Actions';

class ItemSettingsScene extends Component {
    constructor(props) {
        super(props);
    }
    onGoBack() {
        this.props.navigator.pop();
    }
    onInputChange(field, event) {
        let item = this.props.items[this.props.route.itemId];
        item[field] = event.nativeEvent.text;
        this.props.dispatch(Actions.updateItem(item));
    }
    render() {
        let item = this.props.items[this.props.route.itemId];
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
                                <Input inlineLabel label="NAME" value={item.Name} onChange={this.onInputChange.bind(this, 'Name')} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="CATEGORY" value={item.Category} onChange={this.onInputChange.bind(this, 'Category')} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="DUE DATE" value={Time.getTimeToNow(item.Due)} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="QUANTITY" value={item.Quantity.toString()} onChange={this.onInputChange.bind(this, 'Quantity')}/>
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="ITEM COST" value={item.Cost.toCurrency()} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup disabled>
                                <Input inlineLabel label="TOTAL COST" value={(item.Cost*item.Quantity).toCurrency()} />
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
    dispatch: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired
};

const styles = StyleSheet.create({

});

const mapStateToProps = function (store) {
    return {
        items: store.itemState
    };
};

export default connect(mapStateToProps)(ItemSettingsScene);