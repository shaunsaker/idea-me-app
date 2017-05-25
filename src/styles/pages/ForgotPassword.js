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
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 96,
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
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 48,
    },
    inputWrapper: {
        
    },
    buttonContainer: {
        alignItems: 'center',
        paddingBottom: 16
    },
    button: {
        marginTop: 16,
    },
});

export default styles;
