import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from "react-native";
import { connect } from 'react-redux';

import SnackBarComponent from './SnackBarComponent';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    }
});

export class SnackBar extends React.Component {
    constructor(props) {
        super(props);

        this.resetError = this.resetError.bind(this);
        this.retryAction = this.retryAction.bind(this);
    }

    static get propTypes() {
        return {
            userSuccessMessage: PropTypes.string,
            userErrorMessage: PropTypes.string,
            authErrorMessage: PropTypes.string,
            authSuccessMessage: PropTypes.string,
            imageErrorMessage: PropTypes.string,
            cloudDataErrorMessage: PropTypes.string,
            cloudStorageErrorMessage: PropTypes.string,

            errorType: PropTypes.string,  
            retryAction: PropTypes.object,
        };
    }

    resetError() {
        
        // Reset the error depending on the type of error
        const action = (this.props.userSuccessMessage || this.props.authSuccessMessage) ?
            'RESET_' + this.props.errorType + '_SUCCESS'
            :
            'RESET_' + this.props.errorType + '_ERROR';

        this.props.dispatch({
            type: action
        });
    }

    retryAction() {
        this.props.dispatch({
            type: 'TOGGLE_LOADING'
        });

        this.resetError();

        const retryActionData = this.props.retryAction.data && this.props.retryAction.data;

        this.props.dispatch({
            type: this.props.retryAction.type,
            ...retryActionData,
        });
    }

    render() {
        const errorMessage = 
            this.props.userErrorMessage ? 
                this.props.userErrorMessage
                :
                this.props.authErrorMessage ?
                    this.props.authErrorMessage 
                    :
                    this.props.imageErrorMessage ?
                        this.props.imageErrorMessage
                        :
                        this.props.cloudDataErrorMessage ?
                            this.props.cloudDataErrorMessage 
                            :
                            this.props.cloudStorageErrorMessage ?
                                this.props.cloudStorageErrorMessage 
                                :
                                this.props.fileSystemErrorMessage ?
                                    this.props.fileSystemErrorMessage
                                    :
                                    null;  

        const errorSnackBar = errorMessage ?
            <SnackBarComponent 
                text={errorMessage} 
                handleReset={this.resetError}
                handleRetryAction={this.props.retryAction.type ? this.retryAction : null} />
            :
            null;

        const successMessage =  
            this.props.userSuccessMessage ?
                this.props.userSuccessMessage
                :
                this.props.authSuccessMessage ?
                    this.props.authSuccessMessage
                    :
                    null;

        const successSnackBar = successMessage ?
            <SnackBarComponent 
                text={successMessage} 
                success
                handleReset={this.resetError} />
            :
            null;
            
        return (
            <View style={styles.container}>
                {errorSnackBar}
                {successSnackBar}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userSuccessMessage: state.main.app.userSuccessMessage,
        userErrorMessage: state.main.app.userErrorMessage,
        authErrorMessage: state.main.auth.authErrorMessage,
        authSuccessMessage: state.main.auth.authSuccessMessage,
        imageErrorMessage: state.main.images.imageErrorMessage,
        cloudDataErrorMessage: state.main.cloudData.cloudDataErrorMessage,
        cloudStorageErrorMessage: state.main.cloudStorage.cloudcloudStorageErrorMessage,
        fileSystemErrorMessage: state.main.fileSystem.fileSystemErrorMessage,

        errorType: state.main.app.errorType,
        retryAction: state.main.app.retryAction,
    }
}

export default connect(mapStateToProps)(SnackBar);