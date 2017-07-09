import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Animated,
} from "react-native";

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

const styles = StyleSheet.create({
    container: {

    },
    text: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.transPrimary,
    }
});

export default class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.startTimer = this.startTimer.bind(this);
        this.clearTimer = this.clearTimer.bind(this);

        this.timer;

        this.state = {
            displayDuration: 0, // assume this is zero
            duration: 0,
            isCounting: false,
        }
    }

    static get propTypes() {
        return {
            displayDuration: PropTypes.string, // to display initially - can be null
            totalDuration: PropTypes.string, // total to count to - can be null
            startTimer: PropTypes.bool,
        }
    }

    componentDidMount() {
        if (this.props.displayDuration) {
            this.setState({
                displayDuration: this.props.displayDuration,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.startTimer && this.props.startTimer !== prevProps.startTimer) {
            this.startTimer();
        }
        else if (!this.props.startTimer && this.props.startTimer !== prevProps.startTime) {
            this.clearTimer();
        }
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    startTimer() {
        this.timer = setInterval(() => {
            if (this.props.totalDuration && this.state.duration < this.props.totalDuration) {
                this.setState({
                    duration: this.state.duration += 1,
                });
            }

            // We've hit our total count
            else if (this.props.totalDuration) {
                this.clearTimer();
            }

            // No total to count to
            else {
                this.setState({
                    duration: this.state.duration += 1,
                });
            }
        }, 1000);
    }

    clearTimer() {
        clearInterval(this.timer);
    }

    render() {
        const duration = this.state.isCounting ? this.state.duration : this.state.displayDuration;
        const durationText = utilities.getPrettyMinutes(duration);

        return (
            <View style={styles.container}>
                <Text
                    style={[styles.text, styleConstants.primaryFont]}>
                    {durationText}
                </Text>
            </View>
        );
    }
}