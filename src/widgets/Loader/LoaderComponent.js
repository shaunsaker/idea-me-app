import React from 'react';
import {
    View,
    StyleSheet,
    Animated,
} from 'react-native';
import PropTypes from 'prop-types';

import config from '../../config';
import styleConstants from '../../styles/styleConstants';

import AnimateFadeIn from '../../animators/AnimateFadeIn';

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 5,
        backgroundColor: styleConstants.secondary,
    },
});

export default class LoaderComponent extends React.Component {
    constructor(props) {
        super(props);

        this.animate = this.animate.bind(this);

        this.position = new Animated.Value(-100);
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        this.position.setValue(-100);

        Animated.timing(
            this.position,
            {
                toValue: styleConstants.windowWidth,
                duration: 2000,
                easing: config.animation.easing,
                useNativeDriver: true,
            }
        ).start(() => {
            this.animate();
        });
    }

    render() {
        const animatedStyles = {
            transform: [{
                translateX: this.position,
            }],
        }

        return (
            <AnimateFadeIn>
                <Animated.View style={animatedStyles}>
                    <View style={styles.container} />
                </Animated.View>
            </AnimateFadeIn>
        );
    }
}