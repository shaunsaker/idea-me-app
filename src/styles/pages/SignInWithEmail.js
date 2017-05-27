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
        marginBottom: 4
    },
    headerIcon: {
        marginLeft: -10,
    },
    infoContainer: {
        flex: 0.4,
        paddingRight: 96,
        paddingLeft: 16,
        zIndex: -1,
    },
    infoTextTitle: {
        fontSize: 32,
        color: styleConstants.white,
        marginBottom: 8
    },
    infoTextDescription: {
        fontSize: 18,
        color: styleConstants.white,
    },
    inputWrapper: {
        flex: 1,
    },
    inputContainer: {
        alignItems: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        paddingBottom: 16,
    },
    button: {
        marginTop: 16,
    },
});

export default styles;
