import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import Icon from '../styles/icons/index';

import InfoBlock from './InfoBlock';
import Menu from './Menu';
import Label from './Label';

import styleConstants from '../styles/styleConstants';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    cardContainer: {
        position: 'relative',
        width: window.width - 32,
        flex: 1,
        backgroundColor: styleConstants.white,
        borderWidth: 1,
        borderColor: styleConstants.white,
        margin: 16,
        paddingVertical: 16,
        paddingHorizontal: 8,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    menuIconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 42,
        height: 42,
        justifyContent: 'flex-end',
    },
    menuIcon: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primary,
    },
    labelsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
});

export default class IdeaCard extends React.Component {
    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);

        this.state = {
            showMenu: false,
        }
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu,
        });
    }

    render() {
        const menu = this.state.showMenu &&
            <Menu
                values={['Edit', 'Share', 'Delete']}
                handleSelect={(type) => this.props.handleSelect(type, this.props.idea)} />;

        const categoryLabelText = this.props.idea.category ? this.props.idea.category : 'Uncategorised';
        const priorityLabelText = this.props.idea.priority ? this.props.idea.priority + ' Priority' : 'Unprioritised';

        return (
            <View
                style={styles.cardContainer} >

                <TouchableOpacity 
                    onPress={this.toggleMenu}
                    style={styles.menuIconContainer}>
                    <Icon name='more-vert' style={styles.menuIcon} />
                </TouchableOpacity>

                <InfoBlock
                    title={this.props.idea.title}
                    subtitle={this.props.idea.description}
                    titleColor={styleConstants.primary}
                    subtitleColor={styleConstants.grey} />

                <View
                    style={styles.labelsContainer} >
                    <Label
                        iconName='group'
                        labelText={categoryLabelText} />
                    <Label
                        iconName='sort'
                        labelText={priorityLabelText} />
                </View>

                {menu}

            </View>
        )
    }
}