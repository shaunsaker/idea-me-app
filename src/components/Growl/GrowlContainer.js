import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import { connect } from 'react-redux';

import GrowlComponent from './GrowlComponent';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    }
});

export class Growl extends React.Component {
    constructor(props) {
        super(props);

        this.resetError = this.resetError.bind(this);
        this.retryAction = this.retryAction.bind(this);
    }

    static get propTypes() {
        return {
            userErrorMessage: React.PropTypes.string,
            authErrorMessage: React.PropTypes.string,
            authSuccessMessage: React.PropTypes.string,
            apiErrorMessage: React.PropTypes.string,
            geolocationErrorMessage: React.PropTypes.string,
            storageErrorMessage: React.PropTypes.string,

            errorType: React.PropTypes.string,  
            retryAction: React.PropTypes.string,

            ideas: React.PropTypes.array,
            categories: React.PropTypes.array,
            uid: React.PropTypes.string,
        };
    }

    resetError() {
        
        // Reset the error depending on the type of error
        const action = this.props.authSuccessMessage ? // If more success messages are needed, we'll need to handle this differently
            'RESET_' + this.props.errorType + '_SUCCESS'
            :
            'RESET_' + this.props.errorType + '_ERROR';

        this.props.dispatch({
            type: action
        });
    }

    retryAction() {
        this.resetError();

        // this.props.dispatch({
        //     type: this.props.retryAction,
        //     ideas: this.props.ideas, // not sure which we'll need so let's just attach all of them
        //     categories: this.props.categories,
        //     uid: this.props.uid,
        // });
    }

    render() {
        const errorMessage = 
            this.props.userErrorMessage ? 
                this.props.userErrorMessage
                :
                this.props.authErrorMessage ?
                    this.props.authErrorMessage 
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
                handleReset={this.resetError}
                handleRetryAction={this.props.retryAction ? this.retryAction : null} />
            :
            null;

        const successMessage =  
            this.props.authSuccessMessage ?
                this.props.authSuccessMessage
                :
                null;

        const successGrowl = successMessage ?
            <GrowlComponent 
                text={successMessage} 
                success
                handleReset={this.resetError} />
            :
            null;
            
        return (
            <View style={styles.container}>
                {errorGrowl}
                {successGrowl}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userErrorMessage: state.main.app.userErrorMessage,
        authErrorMessage: state.main.auth.authErrorMessage,
        authSuccessMessage: state.main.auth.authSuccessMessage,
        apiErrorMessage: state.main.api.apiErrorMessage,
        geolocationErrorMessage: state.main.geolocation.geolocationErrorMessage ,
        storageErrorMessage: state.main.storage.storageErrorMessage,

        errorType: state.main.app.errorType,
        retryAction: state.main.app.retryAction,

        ideas: state.main.userData.ideas,
        categories: state.main.userData.categories,
        uid: state.main.auth.uid,
    }
}

export default connect(mapStateToProps)(Growl);