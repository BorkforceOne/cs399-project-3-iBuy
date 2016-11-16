import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, List, Header, Title, Content, Badge, Text, ListItem } from 'native-base';
import ColorCodedListItem from '../Components/ColorCodedListItem';
import '../Utils/NumberHelpers';
import { connect } from 'react-redux';
import Selectors from '../Store/Selectors';

class ItemFilterDrawer extends Component {
    constructor(props) {
        super(props);
    }
    onDateFilterSelected(range) {
        this.props.onFilterSelected({
            Type: "BY_RANGE",
            Range: range,
            Title: "Last 7 Days"
        });
    }
    onGroupFilterSelected(groupId) {
        this.props.onFilterSelected({
            Type: "BY_GROUP",
            GroupId: groupId,
            Title: this.props.groups[groupId].Name
        });
    }
    onAllFilterSelected() {
        this.props.onFilterSelected({
            Type: "ALL",
            Title: "All Items"
        });
    }
    render() {

        let filters = [];

        filters.push(
            <ListItem itemDivider key={"groups-divider"}>
                <Text>Groups</Text>
            </ListItem>
        );

        for (let id in this.props.groups) {
            let group = this.props.groups[id];
            filters.push(
                <ColorCodedListItem key={"group-" + id} color={group.Color}
                    onPress={this.onGroupFilterSelected.bind(this, id)}>
                    <Text>{group.Name}</Text>
                    <Badge info textStyle={{lineHeight: 20}}>{group.ItemIds.length}</Badge>
                </ColorCodedListItem>
            );
        }

        filters.push(
            <ListItem itemDivider key={"others-divider"}>
                <Text>Other Filters</Text>
            </ListItem>
        );

        filters.push(
            <ListItem key="others-7days" onPress={this.onAllFilterSelected.bind(this)}>
                <Text>All Items</Text>
                <Badge info textStyle={{lineHeight: 20}}>{Object.keys(this.props.items).length}</Badge>
            </ListItem>
        );

        filters.push(
            <ListItem key="others-7days" onPress={this.onDateFilterSelected.bind(this, 7 * 24 * 60 * 60 * 1000)}>
                <Text>Upcoming within 7 days</Text>
                <Badge info textStyle={{lineHeight: 20}}>{this.props.items7DaysCount}</Badge>
            </ListItem>
        );

        return (
            <Container>
                <Header>
                    <Title>Item Filters</Title>
                </Header>
                <Content style={styles.content}>
                    <List>
                        {filters}
                    </List>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white'
    },
    initials: {
        position: 'absolute',
        left: 10,
        bottom: 20,
        width: 20,
        height: 20,
        backgroundColor: 'red'
    }
});


const getNext7Days = Selectors.makeGetItemsFromTimespan(7 * 24 * 60 * 60 * 1000);
const mapStateToProps = function(state) {
    return {
        groups: Selectors.getGroups(state),
        items: Selectors.getItems(state),
        items7DaysCount: Object.keys(getNext7Days(state)).length
    };
};

export default connect(mapStateToProps)(ItemFilterDrawer);