import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import Page from '../components/Page';
import Header from '../components/Header';
import ItemListHeader from '../components/ItemListHeader';
import ItemList from '../components/ItemList';

import styleConstants from '../styles/styleConstants';

export class EditLocation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suburbs: null,
            editUserLocation: null,
        }

        this.updateEditUserLocation = this.updateEditUserLocation.bind(this);
        this.setUserLocation = this.setUserLocation.bind(this);
    }

    static get propTypes() {
        return {
            userLocation: React.PropTypes.string,
            currentLocation: React.PropTypes.string,
            suburbs: React.PropTypes.array,
        };
    }

    componentDidMount() {
        this.setState({
            suburbs: this.props.suburbs
        });
    }

    updateEditUserLocation(text) {
        const pattern = new RegExp(text.toLowerCase(), 'g');

        const suburbSuggestions = this.props.suburbs.filter((value) => {
            return value.toLowerCase().match(pattern);
        });

        this.setState({
            suburbs: suburbSuggestions,
            editUserLocation: text,
        });
    }

    setUserLocation(value) {
        // Save here?

        this.props.dispatch({
            type: 'SET_USER_LOCATION',
            userLocation: value,
        });

        Actions.pop();
    }

    render() {
        const enableContinueButton = this.state.editUserLocation;

        return (
            <Page>

                <Header
                    backButton
                    showInput
                    inputValue={this.state.editUserLocation}
                    inputPlaceholderText='Enter Your Location'
                    handleChangeText={this.updateEditUserLocation}
                    headerShadow />

                <ItemListHeader
                    currentLocation={this.props.currentLocation}
                    hasError={this.props.currentLocationError}
                    handlePress={this.setUserLocation} />

                <ItemList
                    items={this.state.suburbs}
                    handleItemPress={this.setUserLocation}
                    iconName='gps-not-fixed' />

            </Page>
        );
    }
};

function mapStateToProps(state) {
    return ({
        userLocation: state.main.userData.profile.userLocation,
        currentLocation: state.main.geolocation.currentLocation,
        currentLocationError: state.main.geolocation.geolocationError,
        suburbs: state.main.appData.suburbs,
    });
}

export default connect(mapStateToProps)(EditLocation);