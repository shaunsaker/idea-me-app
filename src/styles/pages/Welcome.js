import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: styleConstants.primary,
        justifyContent: 'space-around',
        padding: 16,
    },
    logoContainer: {

    },
    infoContainer: {
        backgroundColor: styleConstants.primary,
        paddingHorizontal: 8,
    },
    infoTextTitle: {
        fontSize: 32,
        color: styleConstants.white,
        marginBottom: 8,
    },
    infoTextDescription: {
        fontSize: 18,
        color: styleConstants.white,
    },
    buttonGroup: {
        
    },
    button: {
        marginBottom: 16
    },
});

export default styles;
