import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, List, Header, Title, Content, Badge, Text, ListItem } from 'native-base';
import ColorCodedListItem from '../Components/ColorCodedListItem';
import '../Utils/NumberHelpers';

export default class ItemFilterDrawer extends Component {
    constructor() {
        super();
        this.state = {
            groups: [
                {
                    name: "Group 1",
                    color: "#f33",
                    numberItems: 4
                },
                {
                    name: "Group 2",
                    color: "#1a1",
                    numberItems: 6
                }
            ]
        }
    }
    render() {

        let filters = [];

        filters.push(
            <ListItem itemDivider key={"groups-divider"}>
                <Text>Groups</Text>
            </ListItem>
        );

        filters = filters.concat(this.state.groups.map((group, i) => {
            return (
                <ColorCodedListItem key={"group-" + i} color={group.color}>
                    <Text>{group.name}</Text>
                    <Badge info textStyle={{lineHeight: 20}}>{group.numberItems}</Badge>
                </ColorCodedListItem>
            );
        }));

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
