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
        backgroundColor: styleConstants.white,
        borderRadius: 32,
        marginBottom: 16,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
        width: 280,
        paddingVertical: 12,
    },
    dropdownItemsContainer: {
        borderRadius: 32,
        elevation: 4,
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
        width: 280
    },
    dropdownItem: {
        
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: styleConstants.white,
        paddingVertical: 12,
    },
    dropdownItemAdd: {
        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',        
        borderBottomWidth: 2,
        borderStyle: 'solid',
        borderColor: styleConstants.blue,
        backgroundColor: styleConstants.white,
        paddingVertical: 12,
    },
    dropdownItemText: {
        color: styleConstants.black,
        fontSize: 18,
    },
    editIcon: {
        marginRight: 12
    }
};

export default styles;
