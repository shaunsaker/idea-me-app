import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import ItemListHeader from '../components/ItemListHeader';
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
    }

    updateEditUserLocation(text) {
        const suburbSuggestions = utilities.filterArrayByValue(text, this.props.suburbs);

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
            <Page 
                removeBottomPadding>

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