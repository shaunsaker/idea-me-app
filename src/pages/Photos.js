import React from "react";
import {
    View,
    Text,
} from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import utilities from '../utilities';
import styleConstants from '../styles/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import PhotoCard from '../components/PhotoCard';
import Loader from '../components/Loader';
import SnackBar from '../components/SnackBar';

export class Photos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            photos: [],
        }
    }

    static get propTypes() {
        return {
            idea: React.PropTypes.object,
        };
    }

    render() {
        return (
            <Page
                backgroundColor={styleConstants.white}
                removeBottomPadding>

                <Header
                    headerShadow
                    closeButton
                    continueButton
                    text='Photos'
                    handleRightIconPress={null} />

                <PhotoCard
                    idea={this.props.idea} 
                    photos={this.state.photos}
                    handleDeletePhoto={null}
                    handleAddPhoto={null} />

                <SnackBar />

                <Loader
                    position='bottom' />

            </Page>
        );
    }
}

function mapStateToProps(state) {
    return ({

    });
}

export default connect(mapStateToProps)(Photos);