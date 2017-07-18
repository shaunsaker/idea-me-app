import React from "react";
import PropTypes from 'prop-types';
import {
	View,
    Text,
	StyleSheet,
} from "react-native";

import styleConstants from '../styles/styleConstants';

import Touchable from './Touchable';

const radioButtonWidth = (styleConstants.windowWidth - 32) / 3;

const styles = StyleSheet.create({
    container: {
 
    },
    titleContainer: {
        paddingVertical: 8,
    },
    title: {
        fontSize: styleConstants.smallFont,
        color: styleConstants.lightGrey,
    },
    radioButtonsContainer: {
        marginTop: 8,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: styleConstants.lightGrey,
    },
    radioButtonContainer: {

    },
    radioButton: {
        width: radioButtonWidth,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelContainer: {
    },
    label: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.lightGrey,
    },
});

export default class RadioSelect extends React.Component {
    constructor(props) {
        super(props);

        this.select = this.select.bind(this);
        this.setActive = this.setActive.bind(this);

        this.state = {
            active: null,
        };
    }

	static get propTypes() {
		return {
            displayText: PropTypes.string,
            currentValue: PropTypes.string,
            values: PropTypes.array,
            handleSelect: PropTypes.func,
		}
	}

    componentDidMount() {
        if (this.props.currentValue) {
            this.setActive(this.props.currentValue);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentValue && this.props.currentValue !== prevProps.currentValue && this.props.currentValue !== this.state.active) {
            this.setActive(this.props.currentValue);
        }
    }

    select(value) {
        this.setActive(value);
        this.props.handleSelect(value);
    }

    setActive(value) {
        this.setState({
            active: value,
        });
    }

	render() {   
        const activeTitleStyles = this.state.active && 
            {
                color: styleConstants.secondary,
            };

        const radioButtons = this.props.values.map((value) => {
            return (
                <Touchable
                    key={'radio-' + value.title}
                    style={styles.radioButtonContainer}
                    onPress={() => this.select(value.title)}>
                    <View style={[styles.radioButton]}>
                        <View style={styles.labelContainer}>
                            <Text style={[styles.label, styleConstants.primaryFont]}>
                                {value.title}
                            </Text>
                        </View>
                    </View>
                </Touchable> 
            );
        });

		return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, activeTitleStyles, styleConstants.primaryFont]}>
                        {this.props.displayText}
                    </Text>
                </View>
                <View style={styles.radioButtonsContainer}>
                    <View style={{position: 'absolute', zIndex: -1, left: 0, width: radioButtonWidth, height: 56, backgroundColor: 'red'}} />
                    {radioButtons}                 
                </View>
            </View>
		);
	}
}