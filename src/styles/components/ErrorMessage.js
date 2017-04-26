import { Dimensions } from "react-native";
import styleConstants from '../styleConstants'; 

const windowWidth = Dimensions.get('window').width;

const styles = {
    errorMessageWrapper: {        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorMessageContainer: {
        position: 'absolute',
        width: windowWidth,
        minHeight: 84,
        backgroundColor: styleConstants.secondary, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMessageText: {
        fontSize: 18,
        textAlign: 'center',
        color: styleConstants.primary
    },
    icon: {
        marginTop: 2,
        marginRight: 8
    }
};

export default styles;
