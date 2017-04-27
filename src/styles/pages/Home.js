import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: styleConstants.white
    },
    button: {        
        justifyContent: 'center',
        alignItems: 'center',
        margin: 16,
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: styleConstants.white,
        backgroundColor: styleConstants.primary,
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    }
});

export default styles;
