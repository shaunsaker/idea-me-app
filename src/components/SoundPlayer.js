import React from "react";
import PropTypes from 'prop-types';
import {
    View,
} from "react-native";
import { Player } from 'react-native-audio-toolkit';

export default class SoundPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.loadPlayer = this.loadPlayer.bind(this);
        this.playSound = this.playSound.bind(this);

        this.player;
    }

    static get propTypes() {
        return {
            fileName: PropTypes.string.isRequired,
            playSound: PropTypes.bool,
        }
    }

    componentDidMount() {
        this.loadPlayer();
    }

    componentDidUpdate(prevProps) {
        if (this.props.playSound && this.props.playSound !== prevProps.playSound) {
            this.playSound();
        }
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.destroy();
        }
    }

    loadPlayer() {
        if (this.player) {
            this.player.destroy();
        }

        this.player = new Player(
            this.props.fileName,
            {
                autoDestroy: false
            }
        ).prepare();
    }

    playSound() {
        this.player.playPause((error, paused) => {

            // Do  nothing
        });
    }

    render() {
        return <View />;
    }
}