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
            userAuthSuccessMessage: React.PropTypes.string,
            apiErrorMessage: React.PropTypes.string,
            geolocationErrorMessage: React.PropTypes.string,
            storageErrorMessage: React.PropTypes.string,
            errorType: React.PropTypes.string,  
        };
    }

    resetError() {
        
        // Reset the error depending on the type of error
        const action = this.props.userAuthSuccessMessage ? // If more success messages are needed, we'll need to handle this differently
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

        const errorGrowl = errorMessage ?
            <GrowlComponent 
                text={errorMessage} 
                handleReset={this.resetError} />
            :
            null;

        const successMessage =  
            this.props.userAuthSuccessMessage ?
                this.props.userAuthSuccessMessage
                :
                null;

        const successGrowl = successMessage ?
            <GrowlComponent 
                text={successMessage} 
                success={true}
                handleReset={this.resetError} />
            :
            null;

        console.log(successMessage);

        return (
            <View>
                {errorGrowl}
                {successGrowl}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userErrorMessage: state.main.app.userErrorMessage,
        userAuthErrorMessage: state.main.userAuth.userAuthErrorMessage,
        userAuthSuccessMessage: state.main.userAuth.userAuthSuccessMessage,
        apiErrorMessage: state.main.api.apiErrorMessage,
        geolocationErrorMessage: state.main.geolocation.geolocationErrorMessage ,
        storageErrorMessage: state.main.storage.storageErrorMessage,
        errorType: state.main.app.errorType
    }
}

export default connect(mapStateToProps)(Growl);