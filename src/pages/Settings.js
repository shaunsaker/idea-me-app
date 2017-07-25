import React from "react";
import PropTypes from 'prop-types';
import {
    View,
} from "react-native";
import { connect } from "react-redux";

import styleConstants from '../assets/styleConstants';

import Page from '../components/Page';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';

export class Settings extends React.Component {
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {

        };
    }

    render() {
        return (
            <Page
                backgroundColor={styleConstants.white}
                removeBottomPadding >

                <Header
                    text='Settings'
                    backButton
                    headerShadow />

                {/* <NoteCard
                    type='categories'
                    categories={categoriesArray}
                    hideTitle
                    inputValue={this.state.newCategory}
                    handleChangeText={this.updateNewCategory}
                    handleAdd={this.addCategory}
                    handleDelete={this.toggleDeleteModal} /> */}

            </Page >
        );
    }
}

function mapStateToProps(state) {
    return ({

    });
}

export default connect(mapStateToProps)(Settings);