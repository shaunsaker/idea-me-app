import {
    StyleSheet,
    Dimensions,
} from "react-native";
import styleConstants from '../styleConstants'; 

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: window.width,
        height: window.height,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: styleConstants.primary
    },
});

export default styles;