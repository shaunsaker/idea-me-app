import React from "react";
import {
    View,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import InputContainer from '../components/InputContainer';
import EditableImage from '../components/EditableImage';
import Input from '../components/Input';
import Button from '../components/Button';
import Growl from '../components/Growl';
import Loader from '../components/Loader';

export class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editUserName: null,
            editEmail: null,
        }

        this.updateEditUserName = this.updateEditUserName.bind(this);
        this.updateEditEmail = this.updateEditEmail.bind(this);
        this.updateUserDetails = this.updateUserDetails.bind(this);
    }

    static get propTypes() {
        return {
            uid: React.PropTypes.string,
            userName: React.PropTypes.string,
            email: React.PropTypes.string,
            location: React.PropTypes.string,
            photoUrl: React.PropTypes.string,
        };
    }

    componentDidMount() {
        this.updateEditUserName(this.props.userName);
        this.updateEditEmail(this.props.email);
    }

    updateEditUserName(value) {
        this.setState({
            editUserName: value
        });
    } 

    updateEditEmail(value) {
        this.setState({
            editEmail: value
        });
    }

    updateUserDetails() {

    }

    render() {
        const enableContinueButton = this.state.editEmail && this.state.editUserName;

        return (
            <Page
                backgroundColor={styleConstants.primary} >

                <Header
                    text='Edit Profile'
                    closeButton
                    headerShadow />

                <InputContainer>
                    <EditableImage 
                        uri={this.props.photoUrl} />

                    <Input
                        placeholder="NAME"
                        value={this.state.editUserName}
                        handleChange={this.updateEditUserName} />

                    <Input
                        placeholder="EMAIL ADDRESS"
                        value={this.state.editEmail}
                        handleChange={this.updateEditEmail} />

                    <Button
                        iconName='location-on'
                        text={this.props.location}
                        styleMode='transparent'
                        handlePress={() => Actions.editLocation()} />
                </InputContainer>

                <Button
                    iconName='check'
                    text='Continue'
                    styleMode='primaryReversed'
                    handlePress={this.updateUserDetails}
                    disabled={!enableContinueButton} />

                <Growl />

                <Loader />

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({
        uid: state.main.auth.uid,
        userName: state.main.userData.profile.userName,
        email: state.main.userData.profile.email,
        location: state.main.userData.profile.location,
        photoUrl: state.main.userData.profile.photoUrl,
    });
}

export default connect(mapStateToProps)(Profile);