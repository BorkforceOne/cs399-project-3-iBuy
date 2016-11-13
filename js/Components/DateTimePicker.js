import React, { Component } from 'react';
import {
    DatePickerAndroid,
    StyleSheet,
    Text,
    TimePickerAndroid,
    View,
} from 'react-native';
import Time from '../Utils/Time';
import { Button } from 'native-base';

const styles = StyleSheet.create({
    dateDisplay: {
        borderColor: '#DDDDDD',
        justifyContent: 'center',
    },
    dateTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    label: {
        flex: 1,
        textAlign: 'center',
        color: '#575757'
    },
    button: {
        flex: 2,
    },
    listView: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default class DateTimePicker extends Component {
    constructor(props) {
        super(props);
        let currentDate = null,
            minDate     = undefined,
            maxDate     = undefined;

        if (props.date) {
            currentDate = new Date(props.date);
        }

        if (props.minDate) {
            minDate = new Date(props.minDate);
        }

        if (props.maxDate) {
            maxDate = new Date(props.maxDate);
        }

        this.state = {
            date: currentDate,
            minDate: minDate,
            maxDate: maxDate,
            label: props.label || props.mode.toUpperCase(),
            mode: props.mode
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.date) {
            this.setState({
                date: new Date(nextProps.date)
            });
        }
    }

    getDisplayValue(date) {
        if (!date) {
            return null;
        }

        if (this.props.mode === 'time') {
            date.setSeconds(0);

            return date.toLocaleTimeString();
        } else if (this.props.mode === 'date') {
            return date.toLocaleDateString();
        } else {
            return Time.getDatetimeFull(date);
        }
    };

    handleDateChange(date) {
        this.setState({ date });
        this.props.onChange(date);
    };

    handleAndroidPickerDisplay (){
        if (this.props.mode === 'date' || this.props.mode === 'datetime') {
            DatePickerAndroid.open({
                date: this.state.date || new Date(),
                minDate: this.state.minDate,
                maxDate: this.state.maxDate
            })
                .then(({ datePickerAction, year, month, day }) => {
                    console.log(datePickerAction);
                    console.log(year);
                    if (datePickerAction !== DatePickerAndroid.dismissedAction && year !== undefined && month !== undefined && day !== undefined ) {
                        if (this.props.mode === 'datetime') {
                            let options = {};
                            if (this.state.date) {
                                options = {
                                    hour: this.state.date.getHours(),
                                    minute: this.state.date.getMinutes(),
                                }
                            }
                            TimePickerAndroid.open(options)
                                .then(({ timePickerAction, hour, minute }) => {
                                    if (timePickerAction !== TimePickerAndroid.dismissedAction && hour !== undefined  && minute !== undefined ) {
                                        const dateWithHoursAndMinutes = new Date(
                                            year,
                                            month,
                                            day,
                                            hour,
                                            minute
                                        );

                                        this.handleDateChange(dateWithHoursAndMinutes);
                                    }
                                })
                                .catch(({ code, message }) => console.info(`Cannot open date picker ${code}`, message));
                        } else {
                            const newDate = new Date(year, month, day);

                            this.handleDateChange(newDate);
                        }
                    }
                })
                .catch(({ code, message }) => console.info(`Cannot open date picker ${code}`, message));
        } else if (this.props.mode === 'time') {
            TimePickerAndroid.open({
                ...(this.state.date
                        ? {
                        hour: this.state.date.getHours(),
                        minute: this.state.date.getMinutes(),
                    }
                        : {}
                ),
            })
                .then(({ action, hour, minute }) => {
                    if (action !== TimePickerAndroid.dismissedAction) {
                        const date = new Date();

                        date.setHours(hour);
                        date.setMinutes(minute);
                        date.setSeconds(0);

                        this.handleDateChange(date);
                    }
                })
                .catch(({ code, message }) => console.info(`Cannot open date picker ${code}`, message));
        }
    };

    render() {
        const toRender = (
            <View style={styles.listView}>
                <Text style={styles.label}>{this.state.label}</Text>
                <Button style={styles.button} onPress={this.handleAndroidPickerDisplay.bind(this)}>
                    {this.getDisplayValue(this.state.date)}
                </Button>
            </View>
        );


        return (
            <View>
                {this.props.buttonRender
                    ? (this.props.buttonRender)()
                    : toRender
                }
            </View>
        );
    }
}

DateTimePicker.PropTypes = {
    date: React.PropTypes.string,
    label: React.PropTypes.string,
    mode: React.PropTypes.oneOf([
        'datetime',
        'date',
        'time',
    ]),
    onChange: React.PropTypes.func.isRequired,
    buttonRender: React.PropTypes.func,
};