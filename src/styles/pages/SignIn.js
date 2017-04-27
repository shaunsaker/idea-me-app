import { StyleSheet } from 'react-native';
import styleConstants from '../styleConstants'; 

const styles = StyleSheet.create({
    container: {        
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 56,
        backgroundColor: styleConstants.white
    },
    passwordText: {
        color: styleConstants.grey,
        fontSize: 16
    }
});

export default styles;
