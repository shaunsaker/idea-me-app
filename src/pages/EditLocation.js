import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import ItemList from '../components/ItemList';

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

        // Get the user's current location
        if (!this.props.currentLocation) {

            // Reduce jank on page mount
            setTimeout(() => {
                this.props.dispatch({
                    type: 'getUserLocation'
                });
            }, 500);
        }
    }

    updateEditUserLocation(text) {
        const suburbSuggestions = utilities.filterArrayByValue(text, this.props.suburbs);

        this.setState({
            suburbs: suburbSuggestions,
            editUserLocation: text,
        });
    }

    setUserLocation(value) {
        this.props.dispatch({
            type: 'SET_USER_LOCATION',
            userLocation: value.title,
        });

        Actions.pop();
    }

    render() {
        return (
            <Page 
                removeBottomPadding>

                <Header
                    backButton
                    showInput
                    inputValue={this.state.editUserLocation}
                    inputPlaceholderText='Enter Your Location'
                    handleChangeText={this.updateEditUserLocation}
                    headerShadow />

                <ItemList
                    items={this.state.suburbs}
                    handleItemPress={this.setUserLocation}
                    iconName='location_inaccurate'
                    headerTitle='Use Your Current Location'
                    headerValue={this.props.currentLocation}
                    headerDisabled={this.props.geolocationError}
                    headerIconName='location_accurate'  />

            </Page>
        );
    }
};

function mapStateToProps(state) {
    return ({
        userLocation: state.main.userData.profile.userLocation,
        currentLocation: state.main.geolocation.currentLocation,
        geolocationError: state.main.geolocation.geolocationError,
        suburbs: state.main.appData.suburbs,
    });
}

export default connect(mapStateToProps)(EditLocation);