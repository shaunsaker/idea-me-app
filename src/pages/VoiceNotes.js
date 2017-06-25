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
import VoiceNoteCard from '../components/VoiceNoteCard';
import Loader from '../components/Loader';
import SnackBar from '../components/SnackBar';

export class VoiceNotes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            voiceNotes: [],
        }
    }


    static get propTypes() {
        return {

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
                    text='VoiceNotes'
                    handleRightIconPress={null} />

                <VoiceNoteCard
                    idea={this.props.idea} 
                    voiceNotes={this.state.voiceNotes}
                    handleDeleteVoiceNote={null}
                    handleAddVoiceNote={null} />

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

export default connect(mapStateToProps)(VoiceNotes);