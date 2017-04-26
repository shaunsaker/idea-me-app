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
        backgroundColor: styleConstants.primary,
        borderRadius: 32,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        width: 280,
        paddingVertical: 8,
        marginTop: 16
    },
    dropdownItemsWrapper: {
        position: 'absolute',
        top: 56,
        width: 280,
        zIndex: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        elevation: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        backgroundColor: styleConstants.white,
    },
    dropdownItemsContainer: {
        alignItems: 'center',
    },
    dropdownItem: {        
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: styleConstants.white,
        paddingVertical: 6,
        width: 240
    },
    dropdownItemAdd: {        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',        
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: styleConstants.primary,
        backgroundColor: styleConstants.white,
        paddingVertical: 6,
    },
    dropdownButtonText: {
        color: styleConstants.white,
        fontSize: 24,
        textAlign: 'center',
        width: 240
    },
    dropdownItemText: {
        color: styleConstants.primary,
        fontSize: 16,
        textAlign: 'center'
    },
    editIcon: {
        marginRight: 12
    }
};

export default styles;
