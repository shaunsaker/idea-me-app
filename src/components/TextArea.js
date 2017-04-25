import React from "react";
import {
    TextInput,
} from "react-native";

import styles from '../styles/components/TextArea';
import styleConstants from '../styles/styleConstants';

export default class TextArea extends React.Component {
    constructor(props) {
        super(props);

        this.changeInputHeight = this.changeInputHeight.bind(this);

        this.state = {
            height: 0,
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
        this.setState({
            height: newHeight
        });
    }

    render() {
        return (
            <TextInput
                value={this.props.value ? this.props.value : ''}
                placeholder={this.props.placeholder ? this.props.placeholder : ''} 
                placeholderTextColor={styleConstants.grey}
                underlineColorAndroid={styleConstants.secondary}
                style={[styles.textarea, {height: Math.max(42.5, this.state.height)}, styleConstants.robotoCondensed]}
                onChangeText={(text) => this.props.handleChange(text)} 
                editable={true}
                multiline={true} 
                onContentSizeChange={event => this.changeInputHeight(event.nativeEvent.contentSize.height)}/>
        );
    }
}