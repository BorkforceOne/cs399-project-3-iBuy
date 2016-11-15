import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, List, Header, Title, Content, Badge, Text, ListItem } from 'native-base';
import ColorCodedListItem from '../Components/ColorCodedListItem';
import '../Utils/NumberHelpers';
import { connect } from 'react-redux';
import Selectors from '../Store/Selectors';

class ItemFilterDrawer extends Component {
    constructor() {
        super();
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
                <ColorCodedListItem key={"group-" + id} color={group.Color}>
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
            <ListItem key="others-7days">
                <Text>Upcoming within 7 days</Text>
                <Badge info textStyle={{lineHeight: 20}}>2</Badge>
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

const mapStateToProps = function(state) {
    return {
        groups: Selectors.getGroups(state)
    };
};

export default connect(mapStateToProps)(ItemFilterDrawer);