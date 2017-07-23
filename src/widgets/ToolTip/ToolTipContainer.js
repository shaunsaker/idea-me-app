import React from "react";
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from "react-native";
import { connect } from 'react-redux';

import styleConstants from '../../assets/styleConstants';

import ToolTipComponent from './ToolTipComponent';

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});

export class ToolTip extends React.Component {
    constructor(props) {
        super(props);

        this.setToolTip = this.setToolTip.bind(this);
        this.handleNextToolTip = this.handleNextToolTip.bind(this);
        this.toggleHideToolTip = this.toggleHideToolTip.bind(this);

        this.state = {
            currentToolTip: null,
            hideToolTip: false,
        }
    }

    static get propTypes() {
        return {
            showToolTips: PropTypes.bool,
            currentToolTipUID: PropTypes.string,
            tooltips: PropTypes.object,
        };
    }

    componentDidMount() {
        if (this.props.showToolTips) {
            if (this.props.currentPage === 'addIdea') {
                this.setToolTip(null, 'toolTip-2');
            }
            else if (this.props.currentPage === 'categories') {
                this.setToolTip(null, 'toolTip-4');
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.showToolTips) {

            // On first start 
            if (!prevProps.showToolTips) {
                this.setToolTip(null, null);
            }
            else if (this.props.currentPage === 'addIdea' && this.props.currentToolTipUID === 'toolTip-4') {
                this.setToolTip(null, 'toolTip-5');
                this.state.hideToolTip && this.toggleHideToolTip();
            }
            else if (this.props.currentPage === 'home' && this.props.currentToolTipUID === 'toolTip-5') {
                this.setToolTip(null, 'toolTip-6');
                this.state.hideToolTip && this.toggleHideToolTip();
            }
        }
    }

    setToolTip(event, nextToolTipUID) {
        let currentToolTipUID;

        if (nextToolTipUID) {
            currentToolTipUID = nextToolTipUID;
        }
        else {
            currentToolTipUID = 'toolTip-1';
        }

        const currentToolTip = this.props.toolTips[currentToolTipUID];

        this.setState({
            currentToolTip,
        });

        this.props.dispatch({
            type: 'SET_NEXT_TOOL_TIP',
            newToolTipUID: currentToolTipUID,
        });
    }

    handleNextToolTip() {
        if (this.props.currentPage === 'addIdea' && this.props.currentToolTipUID === 'toolTip-2') {
            this.setToolTip(null, 'toolTip-3');
        }
        else if (this.props.currentPage === 'home' && this.props.currentToolTipUID === 'toolTip-6') {
            this.props.dispatch({
                type: 'CANCEL_ONBOARDING',
            });
        }
        else {
            this.toggleHideToolTip();
        }
    }

    toggleHideToolTip() {
        this.setState({
            hideToolTip: !this.state.hideToolTip,
        });
    }

    render() {
        const toolTip = this.props.showToolTips && this.state.currentToolTip && !this.state.hideToolTip &&
            <ToolTipComponent
                toolTip={this.state.currentToolTip}
                handlePress={this.handleNextToolTip} />;

        return (
            <View style={styles.container}>
                {toolTip}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        showToolTips: state.main.app.showToolTips,
        currentToolTipUID: state.main.appData.currentToolTipUID,
        toolTips: state.main.appData.toolTips,
        currentPage: state.routes.scene.name,
    }
}

export default connect(mapStateToProps)(ToolTip);