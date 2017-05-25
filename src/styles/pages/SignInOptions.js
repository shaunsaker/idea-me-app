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
        marginRight: -6,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: styleConstants.primary,
        paddingHorizontal: 16,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    button: {
        marginTop: 16,
    },
});

export default styles;
