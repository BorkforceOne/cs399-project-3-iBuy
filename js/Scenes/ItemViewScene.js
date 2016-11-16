import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Button, List, Header, Title, Icon, Footer, FooterTab, Content, Badge, Text } from 'native-base';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import ColorCodedListItem from '../Components/ColorCodedListItem';
import Drawer from 'react-native-drawer';
import Time from '../Utils/Time';
import ItemFilterDrawer from '../Drawers/ItemFilterDrawer';
import '../Utils/NumberHelpers';
import { connect } from 'react-redux';
import Actions from '../Store/Actions';
import Item from '../Models/Item';
import Selectors from '../Store/Selectors';
import _ from 'lodash';

class ItemViewScene extends Component {
    constructor() {
        super();
        this.state = {
            showDrawer: false
        }
    }

    componentWillMount() {
        this.props.dispatch(Actions.remoteGetItems());
        this.props.dispatch(Actions.remoteGetUsers());
        this.startPoll();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    startPoll() {
        this.timeout = setTimeout(() => {
            this.props.dispatch(Actions.remoteGetItems())
            this.props.dispatch(Actions.remoteGetUsers())
        }, 15000);
    }

    openMenu() {
        this.refs.MenuContext.openMenu("menu");
    }

    gotoScene(id, entityId) {
        if (id == "sign-in") {
            this.props.navigator.resetTo({
                id: id
            });
        } else if (id == "item-settings") {
            this.props.navigator.push({
                id: id,
                itemId: entityId
            });
        } else if (id == "group-view" || id == "item-view") {
            this.props.navigator.replace({
                id: id,
            });
        } else {
            this.props.navigator.push({
                id: id
            });
        }
    }

    onAddItem() {
        let item = new Item();
        if (this.props.route.filter && this.props.route.filter.Type == "BY_GROUP")
            item.GroupId = this.props.route.filter.GroupId;
        else if (Object.keys(this.props.groups).length > 0)
            item.GroupId = Object.keys(this.props.groups)[0];

        this.props.dispatch(Actions.addItem(item));

        this.gotoScene("item-settings", item.Id);
    }

    onShowDrawer() {
        this.setState({
            showDrawer: true
        })
    }

    onFilterChanged(filter) {
        let newRoute = _.cloneDeep(this.props.route);
        newRoute.filter = _.cloneDeep(filter);
        this.props.navigator.replace(newRoute);
    }

    onMenuItemSelected(item) {
        if (item == "toggleShowCompleted") {
            let filter = _.cloneDeep(this.props.route.filter);
            if (!filter)
                filter = {};
            filter.ShowCompleted = !filter.ShowCompleted;
            this.onFilterChanged(filter);
        } else {
            this.gotoScene(item);
        }
    }

    render() {

        let items = [];
        for (let id in this.props.items) {
            let item = this.props.items[id];
            let color = "white";
            if (this.props.groups[item.GroupId])
                color = this.props.groups[item.GroupId].Color
            items.push(
                <ColorCodedListItem key={id} iconLeft color={color} button onPress={this.gotoScene.bind(this, "item-settings", id)}>
                    <Icon style={item.Completed ? {color: "#666"} : {}} name='md-home' />
                    <Text style={item.Completed ? {color: "#666"} : {}}>{item.Name + " (" + item.Quantity + ")"}</Text>
                    {item.Completed ?
                        <Text note style={{color:"#008800"}}>{"Completed  "}</Text>
                        :
                        <Text note>{"due " + Time.getTimeToNow(item.Due) + "  "}</Text>
                    }
                    <Badge info textStyle={{lineHeight: 20}}>{(item.Cost * item.Quantity).toCurrency()}</Badge>
                </ColorCodedListItem>
            );
        }

        let filterTitle = (this.props.route.filter && this.props.route.filter.Title) ? this.props.route.filter.Title : "All Items";
        let showCompleted = this.props.route.filter && this.props.route.filter.ShowCompleted;

        return (
            <Drawer
                open={this.state.showDrawer}
                type="overlay"
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                acceptTap={true}
                closedDrawerOffset={-3}
                styles={drawerStyles}
                content={<ItemFilterDrawer {...this.props} onFilterSelected={this.onFilterChanged.bind(this)}/>}
                elevation={15}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2-ratio/2) },
                    mainOverlay: { opacity:ratio/1.75 }
                })}
                >
                <MenuContext style={{ flex: 1 }} ref="MenuContext">
                    <Menu name="menu" style={styles.moreMenu} onSelect={this.onMenuItemSelected.bind(this)}>
                        <MenuTrigger>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption value="toggleShowCompleted">
                                <Text>{showCompleted ? "Hide" : "Show"} Completed Items</Text>
                            </MenuOption>
                            <MenuOption value="about">
                                <Text>About</Text>
                            </MenuOption>
                            <MenuOption value="sign-in">
                                <Text>Log Out</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                    <Container>
                        <Header>
                            <Button transparent onPress={this.onShowDrawer.bind(this)}>
                                <Icon name="md-menu" />
                            </Button>
                            <Title>Item View - {filterTitle}</Title>
                            <Button transparent onPress={this.openMenu.bind(this)}>
                                <Icon name="md-more" />
                            </Button>
                        </Header>
                        <Content>
                            <List>
                                {items}
                            </List>
                        </Content>
                        <View style={styles.addButton}>
                            <Button rounded primary style={{width: 60, height: 60}} onPress={this.onAddItem.bind(this)}>
                                <Icon name="md-add" />
                            </Button>
                        </View>
                        <Footer>
                            <FooterTab>
                                <Button active>
                                    Items
                                    <Icon name="md-cart"/>
                                </Button>
                                <Button onPress={this.gotoScene.bind(this, "group-view")}>
                                    Groups
                                    <Icon name="md-people"/>
                                </Button>
                            </FooterTab>
                        </Footer>
                    </Container>
                </MenuContext>
            </Drawer>
        )
    }
}

// Set up proptypes
ItemViewScene.propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired
};

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    mainOverlay: { backgroundColor: 'black', opacity: 0 },
    main: { paddingLeft: 3 }
};

const styles = StyleSheet.create({
    addButton: {
        position: "absolute",
        right: 25,
        bottom: 80
    },
    moreMenu: {
        position: 'absolute',
        top: 5,
        right: 5
    }
});

const makeMapStateToProps = () => {
    const getItemsFromFilter = Selectors.makeGetItemsFromFilter();
    const mapStateToProps = (state, props) => {
        return {
            items: getItemsFromFilter(state, props),
            groups: Selectors.getGroups(state),
            users: Selectors.getUsers(state)
        };
    };
    return mapStateToProps;
};

export default connect(makeMapStateToProps)(ItemViewScene);