import React from "react";
import {
    TextInput,
    Animated
} from "react-native";

import styles from '../styles/components/TextArea';
import styleConstants from '../styles/styleConstants';

export default class TextArea extends React.Component {
    constructor(props) {
        super(props);

        this.changeInputHeight = this.changeInputHeight.bind(this);

        this.initialInputHeight = 50.5;

        this.state = {
            height: 0,
            animatedHeight: new Animated.Value(this.initialInputHeight)
        }
    }

    static get propTypes() {

        return {
            placeholder: React.PropTypes.string,
            handleChange: React.PropTypes.func,
            value: React.PropTypes.string,
        };
    }

    changeInputHeight(newHeight) {
        if (newHeight !== this.state.height) {
            this.setState({
                height: newHeight
            });

            Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: newHeight
                }
            ).start();
        }
    }

    render() {
        const inputHeight = Math.max(this.initialInputHeight, this.state.height);

        return (
            <Animated.View style={{height: this.state.animatedHeight}}>
                <TextInput
                    value={this.props.value ? this.props.value : ''}
                    placeholder={this.props.placeholder ? this.props.placeholder : ''} 
                    placeholderTextColor={styleConstants.grey}
                    underlineColorAndroid={styleConstants.grey}
                    style={[styles.textarea, {height: inputHeight}, styleConstants.robotoCondensed]}
                    onChangeText={(text) => this.props.handleChange(text)}                  
                    onChange={event => this.changeInputHeight(event.nativeEvent.contentSize.height)}
                    onContentSizeChange={event => this.changeInputHeight(event.nativeEvent.contentSize.height)}
                    editable={true}
                    multiline={true} />
            </Animated.View>
        );
    }
}