import React from 'react';
import {
    View,
	StyleSheet,
} from 'react-native';

import styleConstants from '../../styles/styleConstants';

import AnimateFadeIn from '../../animators/AnimateFadeIn';
import AnimateTranslateX from '../../animators/AnimateTranslateX';

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 5,
		backgroundColor: styleConstants.secondary,
	},
});

export default LoaderComponent = (props) => {
    const animatedStyles = {
        left: this.position,
    }

    return (
        <AnimateFadeIn
            shouldAnimate={true}>
            <AnimateTranslateX
                initialValue={-100}
                finalValue={styleConstants.windowWidth}
                duration={2000}
                repeat >
                <View style={styles.container} />
            </AnimateTranslateX>
        </AnimateFadeIn>
    );
}