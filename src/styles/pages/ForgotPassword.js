import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: styleConstants.primary,
        justifyContent: 'space-between',
    },
    buttonContainer: {
        alignItems: 'center',
        paddingBottom: 16,
    },
    button: {
        marginTop: 16,
    },
});

export default styles;
