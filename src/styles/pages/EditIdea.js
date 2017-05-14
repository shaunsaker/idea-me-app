import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        justifyContent: 'space-between',    
        alignItems: 'center',
        position: 'relative',
        backgroundColor: styleConstants.white
    },
    inputArea: {
        flex: 1,
        alignItems: 'center',
    },
    textAreaContainer: {
        position: 'relative',
    },
    deleteContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: styleConstants.white,
        borderRadius: 12,
        elevation: 2,
        shadowColor: "#000000",
        shadowOpacity: 0.6,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 0
        },
    },
    delete: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: styleConstants.grey,
    }
});

export default styles;
