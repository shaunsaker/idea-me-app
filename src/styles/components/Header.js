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
        paddingLeft: 16
    },
    rightIcon: {
        paddingRight: 16
    },
    logoContainer: {
        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginRight: 12,
        marginBottom: 8,
        width: 36,
        height: 36
    },
    title: {
        fontSize: 24
    },
};

export default styles;
