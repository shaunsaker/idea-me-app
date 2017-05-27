import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: styleConstants.primary,
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 18,
        color: styleConstants.white,
    },
    logoContainer: {
        paddingBottom: 42
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 96,
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
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        marginTop: 16,
    },
});

export default styles;
