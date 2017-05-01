import { StyleSheet, Dimensions } from 'react-native';
import styleConstants from '../styleConstants'; 

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    loaderContainer: {
        width: windowWidth,
        height: 6,
        position: 'absolute',
        bottom: 0,
        backgroundColor: styleConstants.primary
    },
    loader: {
        width: 120,
        height: 6,
        backgroundColor: styleConstants.secondary,
        position: 'absolute'
    }
});

export default styles;
