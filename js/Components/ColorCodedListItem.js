import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'native-base';

export default class ColorCodedListItem extends Component {
    render() {
        let style = StyleSheet.flatten([styles.colorCode, {backgroundColor: this.props.color}]);
        style["backgroundColor"] = this.props.color;
        return (
            <View>
                <View style={style} />
                <ListItem {...this.props}>
                    {this.props.children}
                </ListItem>
            </View>
        )
    }
}
ColorCodedListItem.propTypes = {
    color: PropTypes.string
};

const styles = StyleSheet.create({
    colorCode: {
        width: 7,
        top: 1,
        bottom: 1,
        left: 4,
        position: 'absolute'
    }
});