import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Container, Button, Header, Icon, Title, Content, InputGroup, Input, List, ListItem, Footer, FooterTab } from 'native-base';
import { connect } from 'react-redux';
import DateTimePicker from '../Components/DateTimePicker';
import Time from '../Utils/Time';
import Actions from '../Store/Actions';
import Moment from 'moment';
import Selectors from '../Store/Selectors';
import Picker from '../Components/Picker';

const Item = Picker.Item;

class ItemSettingsScene extends Component {
    constructor(props) {
        super(props);
    }
    onGoBack() {
        this.props.navigator.pop();
    }
    onInputChange(field, event) {
        let item = this.props.items[this.props.route.itemId];
        let value = event.nativeEvent.text;
        if (field == "Quantity") {
            value = parseInt(value);
            if (event.nativeEvent.text == "")
                value = 0;
            if (isNaN(value) || !isFinite(value))
                return;
        } else if (field == "Cost") {
            value = Math.floor(parseFloat(value.substring(1)) * 100) / 100;
            if (isNaN(value) || !isFinite(value))
                return;
            if (event.nativeEvent.text.charAt(event.nativeEvent.text.length-1) == '.')
                value = value.toString() + '.';
        }
        item[field] = value;
        this.props.dispatch(Actions.updateItem(item));
    }
    onSelectionChange(field, newValue) {
        let item = this.props.items[this.props.route.itemId];
        item[field] = newValue;
        this.props.dispatch(Actions.updateItem(item));
    }
    onDatetimeChanged(field, event) {
        let item = this.props.items[this.props.route.itemId];
        item[field] = Moment(event).toISOString();
        this.props.dispatch(Actions.updateItem(item));
    }
    onComplete() {
        let item = this.props.items[this.props.route.itemId];
        if (!item.Completed) {
            item.Completed = true;
            this.props.dispatch(Actions.updateItem(item));
            this.onGoBack();
        }
    }
    onDelete() {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this item? You cannot undo this action.",
            [
                {text: 'Yes', onPress: () => {
                    let item = this.props.items[this.props.route.itemId];
                    this.props.dispatch(Actions.removeItem(item));
                    this.onGoBack();
                }},
                {text: 'Cancel', onPress: () => {}}
            ]
        );
    }
    render() {

        let groupOptions = [];
        for (let id in this.props.groups) {
            let group = this.props.groups[id];
            groupOptions.push(
                <Item label={group.Name} value={group.Id} key={group.Id} />
            );
        }

        let item = this.props.items[this.props.route.itemId];
        if (!item)
            return null;
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
                            <Picker label="GROUP" value={parseInt(item.GroupId)} onChange={this.onSelectionChange.bind(this, "GroupId")}>
                                {groupOptions}
                            </Picker>
                        </ListItem>
                        <ListItem>
                            <Picker label="CATEGORY" value={item.Category} onChange={this.onSelectionChange.bind(this, "Category")}>
                                <Item label="Category 1" value="1"/>
                                <Item label="Category 2" value="2"/>
                            </Picker>
                        </ListItem>
                        <ListItem>
                            <DateTimePicker label="DUE" date={item.Due} mode={'datetime'} onChange={this.onDatetimeChanged.bind(this, 'Due')}/>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="QUANTITY" keyboardType="numeric" value={item.Quantity.toString()} onChange={this.onInputChange.bind(this, 'Quantity')}/>
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup>
                                <Input inlineLabel label="ITEM COST" keyboardType="numeric" value={"$" + item.Cost} onChange={this.onInputChange.bind(this, 'Cost')} />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup disabled>
                                <Input inlineLabel label="TOTAL COST" value={(item.Cost*item.Quantity).toCurrency()} />
                            </InputGroup>
                        </ListItem>
                    </List>

                </Content>
                <Footer>
                    <FooterTab>
                        <Button active onPress={this.onDelete.bind(this)}>
                            Delete
                            <Icon name="md-trash"/>
                        </Button>
                        <Button active={!item.Completed} onPress={this.onComplete.bind(this)}>
                            Mark Complete
                            <Icon name="md-checkmark"/>
                        </Button>
                    </FooterTab>
                </Footer>
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
        items: Selectors.getItems(store),
        groups: Selectors.getGroups(store)
    };
};

export default connect(mapStateToProps)(ItemSettingsScene);