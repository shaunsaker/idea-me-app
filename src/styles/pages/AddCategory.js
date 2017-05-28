import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: styleConstants.primary
    },
    inputContainer: {     
        flex: 1,
        paddingTop: 16,
    },
    buttonContainer: {
        marginBottom: 16
    },
});

export default styles;
