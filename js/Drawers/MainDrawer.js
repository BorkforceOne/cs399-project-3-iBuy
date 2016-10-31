import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Container, List, ListItem, Header, Title, Content, Badge, Text } from 'native-base';
import ColorCodedListItem from '../Components/ColorCodedListItem';
import '../Utils/NumberHelpers';

export default class MainDrawer extends Component {
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

        let groups = this.state.groups.map((group, i) => {
            return (
                <ColorCodedListItem key={i} color={group.color}>
                    <Text>{group.name}</Text>
                    <Badge info textStyle={{lineHeight: 20}}>{group.numberItems}</Badge>
                </ColorCodedListItem>
            );
        });

        return (
            <Container>
                <Header style={{height: 100}}>
                    <Title>test</Title>
                </Header>
                <Content style={styles.content}>
                    <List>
                        {groups}
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
