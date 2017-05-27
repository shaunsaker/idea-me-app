import React from "react";
import {
    View,
} from "react-native";
import { connect } from 'react-redux';

import GrowlComponent from './GrowlComponent';

export class Growl extends React.Component {
    constructor(props) {
        super(props);

        this.resetError = this.resetError.bind(this);
    }

    static get propTypes() {
        return {
            userErrorMessage: React.PropTypes.string,
            userAuthErrorMessage: React.PropTypes.string,
            apiErrorMessage: React.PropTypes.string,
            geolocationErrorMessage: React.PropTypes.string,
            storageErrorMessage: React.PropTypes.string,
            errorType: React.PropTypes.string,  
        };
    }

    resetError() {
        
        // Reset the error depending on the type of error
        const action = this.props.success ?
            'RESET_' + this.props.errorType + '_SUCCESS'
            :
            'RESET_' + this.props.errorType + '_ERROR';

        this.props.dispatch({
            type: action
        });
    }

    render() {
        const errorMessage = 
            this.props.userErrorMessage ? 
                this.props.userErrorMessage
                :
                this.props.userAuthErrorMessage ?
                    this.props.userAuthErrorMessage 
                    :
                    this.props.apiErrorMessage ?
                        this.props.apiErrorMessage 
                        :
                        this.props.geolocationErrorMessage ?
                            this.props.geolocationErrorMessage 
                            :
                            this.props.storageErrorMessage ?
                                this.props.storageErrorMessage 
                                :
                                null;              

        const growl = errorMessage ?
            <GrowlComponent 
                text={errorMessage} 
                // TODO: pass in success if applicable
                handleReset={this.resetError} />
            :
            null;

        return (
            <View>
                {growl}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userErrorMessage: state.main.app.userErrorMessage,
        userAuthErrorMessage: state.main.userAuth.userAuthErrorMessage,
        apiErrorMessage: state.main.api.apiErrorMessage,
        geolocationErrorMessage: state.main.geolocation.geolocationErrorMessage ,
        storageErrorMessage: state.main.storage.storageErrorMessage,
        errorType: state.main.app.errorType
    }
}

export default connect(mapStateToProps)(Growl);