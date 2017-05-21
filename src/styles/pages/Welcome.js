import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: styleConstants.primary,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    logoContainer: {
        marginBottom: 8
    },
    infoContainer: {
        backgroundColor: styleConstants.primary,
        paddingHorizontal: 8,
        paddingTop: 4,
        paddingBottom: 8,
        borderWidth: 1,
        borderColor: styleConstants.white,
        elevation: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    infoTextTitle: {
        fontSize: 28,
        color: styleConstants.white,
        marginBottom: 4,
    },
    infoTextDescription: {
        fontSize: 18,
        color: styleConstants.white,
    },
    infoTextHighlight: {
        fontSize: 16,
        color: styleConstants.grey,
        textAlign: 'right',
    },
    buttonGroup: {
        flex: 1,
        justifyContent: 'space-around',
        marginTop: 16,
    },
    buttonText: {
        fontSize: 16,
        color: styleConstants.secondary,
        textAlign: 'center'
    }
});

export default styles;
