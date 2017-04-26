import { Dimensions } from 'react-native';
import styleConstants from '../styleConstants'; 

const windowWidth = Dimensions.get('window').width;

const styles = {
    headerContainer: {        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        width: windowWidth,
        top: 0,
        paddingTop: 16,
    },
    leftIcon: { 
        position: 'absolute',
        top: 12,
        left: 8,
    },
    rightIcon: {
        position: 'absolute',
        top: 6,
        right: 8,
    },
    logoContainer: {      
        flex: 1,  
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1
    },
    title: {
        fontSize: 24,
        color: styleConstants.primary,
        paddingHorizontal: 4
    },
    lightbulb: {
        marginBottom: 4,

    }
};

export default styles;
