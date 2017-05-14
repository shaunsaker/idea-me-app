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
        marginTop: 16
    }
});

export default styles;
