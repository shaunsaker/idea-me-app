import { Dimensions } from 'react-native';
import styleConstants from '../styleConstants'; 

const windowWidth = Dimensions.get('window').width;

const styles = {
    dropdownContainer: {
        position: 'relative',
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: styleConstants.secondary,
        borderRadius: 32,
        marginBottom: 16,
        elevation: 1,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        width: 280,
        paddingVertical: 6,
    },
    dropdownItemsContainer: {
        borderRadius: 32,
        elevation: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        padding: 12,
        backgroundColor: styleConstants.white,
        position: 'absolute',
        top: 52,
        width: 280,
    },
    dropdownItem: {        
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: styleConstants.white,
        paddingVertical: 6,
    },
    dropdownItemAdd: {        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',        
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: styleConstants.secondary,
        backgroundColor: styleConstants.white,
        paddingVertical: 6,
    },
    dropdownButtonText: {
        color: styleConstants.primary,
        fontSize: 20,
        width: 200,
        textAlign: 'center'
    },
    dropdownItemText: {
        color: styleConstants.secondary,
        fontSize: 16,
        width: 200,
        textAlign: 'center'
    },
    editIcon: {
        marginRight: 12
    }
};

export default styles;
