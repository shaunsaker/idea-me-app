import {
    StyleSheet,
    Dimensions,
} from "react-native";

const window = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        width: window.width,
        height: window.height,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: styleConstants.primary
    },
});